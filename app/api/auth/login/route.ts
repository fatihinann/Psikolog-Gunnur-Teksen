import { NextRequest, NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import { logger } from '@/lib/logger';
import { setAuthSession } from '@/lib/auth';

// Redis bağlantısını singleton olarak yönet
let redis: any = null;
let redisInitPromise: Promise<void> | null = null;

const initRedis = async () => {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    logger.debug('Redis environment variables not found, using memory store only');
    return;
  }

  if (redis) return; // Zaten bağlıysa tekrar bağlanma

  try {
    const { Redis } = require('@upstash/redis');
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    logger.info('Redis initialized successfully');
  } catch (error) {
    logger.warn('Redis initialization failed, using memory store only', {
      error: error instanceof Error ? error.message : String(error)
    });
    redis = null;
  }
};

// İlk initialization'ı başlat
redisInitPromise = initRedis();

// Rate limiting konfigürasyonu (TEST MOD)
const RATE_LIMIT_CONFIG = {
  maxAttempts: 3, // 3 yanlış deneme
  windowMs: 1 * 60 * 1000, // 1 dakika window
  blockDurationMs: 30 * 1000, // 30 saniye blok süresi
};

// In-memory store (her zaman kullanılabilir)
const memoryStore = new Map<string, { count: number; lastAttempt: number; blockedUntil?: number }>();

// IP adresini al
const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return request.ip || 'unknown';
};

// Memory ile rate limit kontrolü
const checkRateLimitMemory = (ip: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  const record = memoryStore.get(ip);

  if (!record) {
    return { allowed: true };
  }

  if (record.blockedUntil && now < record.blockedUntil) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, retryAfter };
  }

  if (now - record.lastAttempt > RATE_LIMIT_CONFIG.windowMs) {
    memoryStore.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
};

// Redis ile rate limit kontrolü (opsiyonel)
const checkRateLimit = async (ip: string): Promise<{ allowed: boolean; retryAfter?: number }> => {
  // Redis bağlantısını beklemeden memory store'u kontrol et
  const memoryResult = checkRateLimitMemory(ip);
  if (!memoryResult.allowed) {
    return memoryResult;
  }

  // Redis yoksa memory sonucunu kullan
  if (!redis) {
    logger.debug('Using memory store for rate limiting');
    return memoryResult;
  }

  try {
    const key = `login_attempts:${ip}`;
    const blockKey = `login_blocked:${ip}`;

    // Parallel Redis requests
    const [blockedTTL, attemptsData] = await Promise.all([
      redis.ttl(blockKey),
      redis.hgetall(key)
    ]);

    if (blockedTTL > 0) {
      return { allowed: false, retryAfter: blockedTTL };
    }

    const count = attemptsData?.count ? parseInt(attemptsData.count as string) : 0;
    const lastAttempt = attemptsData?.lastAttempt ? parseInt(attemptsData.lastAttempt as string) : 0;

    const now = Date.now();

    if (lastAttempt && (now - lastAttempt) > RATE_LIMIT_CONFIG.windowMs) {
      // Don't await the delete operation
      redis.del(key).catch((err: Error) => logger.error('Failed to delete Redis key', err));
      return { allowed: true };
    }

    return { allowed: true };
  } catch (error) {
    logger.warn('Redis rate limit check error, falling back to memory', {
      error: error instanceof Error ? error.message : String(error)
    });
    return checkRateLimitMemory(ip);
  }
};

// Memory ile başarısız deneme kaydı
const recordFailedAttemptMemory = (ip: string): void => {
  const now = Date.now();
  const record = memoryStore.get(ip);

  if (!record) {
    memoryStore.set(ip, { count: 1, lastAttempt: now });
    return;
  }

  if (now - record.lastAttempt <= RATE_LIMIT_CONFIG.windowMs) {
    record.count += 1;
    record.lastAttempt = now;

    if (record.count >= RATE_LIMIT_CONFIG.maxAttempts) {
      record.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
    }
  } else {
    record.count = 1;
    record.lastAttempt = now;
    delete record.blockedUntil;
  }

  memoryStore.set(ip, record);
};

// Başarısız deneme kaydı (Redis opsiyonel)
const recordFailedAttempt = async (ip: string): Promise<void> => {
  if (!redis) {
    logger.debug('Using memory store for recording failed attempt');
    recordFailedAttemptMemory(ip);
    return;
  }

  try {
    const key = `login_attempts:${ip}`;
    const now = Date.now();

    const attemptsData = await redis.hgetall(key);
    const count = attemptsData?.count ? parseInt(attemptsData.count as string) : 0;
    const lastAttempt = attemptsData?.lastAttempt ? parseInt(attemptsData.lastAttempt as string) : 0;

    let newCount = 1;

    if (lastAttempt && (now - lastAttempt) <= RATE_LIMIT_CONFIG.windowMs) {
      newCount = count + 1;
    }

    await redis.hset(key, {
      count: newCount.toString(),
      lastAttempt: now.toString()
    });

    await redis.expire(key, Math.ceil(RATE_LIMIT_CONFIG.windowMs / 1000));

    if (newCount >= RATE_LIMIT_CONFIG.maxAttempts) {
      const blockKey = `login_blocked:${ip}`;
      await redis.setex(blockKey, Math.ceil(RATE_LIMIT_CONFIG.blockDurationMs / 1000), '1');
    }
  } catch (error) {
    logger.warn('Redis record failed attempt error, falling back to memory', {
      error: error instanceof Error ? error.message : String(error)
    });
    recordFailedAttemptMemory(ip);
  }
};

// Başarılı girişte kayıtları temizle
const clearAttempts = async (ip: string): Promise<void> => {
  memoryStore.delete(ip);

  if (redis) {
    try {
      const key = `login_attempts:${ip}`;
      const blockKey = `login_blocked:${ip}`;

      await redis.del(key);
      await redis.del(blockKey);
    } catch (error) {
      logger.warn('Redis clear attempts error', {
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
};

// Kalan deneme sayısını al
const getRemainingAttempts = async (ip: string): Promise<number> => {
  if (redis) {
    try {
      const key = `login_attempts:${ip}`;
      const attemptsData = await redis.hgetall(key);
      const count = attemptsData?.count ? parseInt(attemptsData.count as string) : 0;

      return Math.max(0, RATE_LIMIT_CONFIG.maxAttempts - count);
    } catch (error) {
      logger.warn('Redis get remaining attempts error', {
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  const record = memoryStore.get(ip);
  const count = record?.count || 0;
  return Math.max(0, RATE_LIMIT_CONFIG.maxAttempts - count);
};

// Admin kimlik bilgileri
const getPasswordHash = () => {
  const envHash = process.env.ADMIN_PASSWORD_HASH;

  if (!envHash) {
    throw new Error('ADMIN_PASSWORD_HASH environment variable is missing');
  }

  // Base64 encoded bcrypt hash (80 karakter)
  if (envHash.length === 80) {
    try {
      const decoded = Buffer.from(envHash, 'base64').toString('utf-8');
      if (decoded.length === 60 && decoded.startsWith('$2b$')) {
        logger.debug('Using base64 decoded hash');
        return decoded;
      }
    } catch (error) {
      logger.warn('Hash decode error', {
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  // Direct bcrypt hash (60 karakter)
  if (envHash.length === 60 && envHash.startsWith('$2b$')) {
    logger.debug('Using direct bcrypt hash');
    return envHash;
  }

  return envHash;
};

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'gunnur',
  passwordHash: getPasswordHash()
};

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    logger.debug('Login request started', { clientIP });

    // Rate limit kontrolü
    const rateLimitResult = await checkRateLimit(clientIP);
    logger.debug('Rate limit check', { clientIP, allowed: rateLimitResult.allowed });

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          message: `Çok fazla yanlış deneme. ${Math.ceil(rateLimitResult.retryAfter! / 60)} dakika sonra tekrar deneyin.`,
          retryAfter: rateLimitResult.retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter!.toString(),
          }
        }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { message: 'Geçersiz JSON verisi' },
        { status: 400 }
      );
    }

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Kullanıcı adı ve şifre gereklidir.' },
        { status: 400 }
      );
    }

    // Username kontrolü - hızlı başarısızlık
    const isUsernameValid = username === ADMIN_CREDENTIALS.username;
    if (!isUsernameValid) {
      // Username yanlışsa şifre kontrolü yapmaya gerek yok
      await recordFailedAttempt(clientIP);
      const newRemainingAttempts = await getRemainingAttempts(clientIP);

      return NextResponse.json(
        {
          message: `Geçersiz kullanıcı adı veya şifre. ${newRemainingAttempts > 0 ? `Kalan deneme hakkı: ${newRemainingAttempts}` : 'Hesap geçici olarak bloklandı.'}`,
          remainingAttempts: newRemainingAttempts
        },
        { status: 401 }
      );
    }

    // Şifre kontrolü
    const isPasswordValid = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);
    const remainingAttempts = await getRemainingAttempts(clientIP);

    if (isUsernameValid && isPasswordValid) {
      // Başarılı giriş
      await clearAttempts(clientIP);
      await setAuthSession(username);
      logger.info('Login successful', { username, clientIP });

      return NextResponse.json(
        {
          message: 'Giriş başarılı',
          username: username
        },
        { status: 200 }
      );
    } else {
      // Başarısız giriş
      await recordFailedAttempt(clientIP);
      const newRemainingAttempts = await getRemainingAttempts(clientIP);

      logger.warn('Login failed', { username, clientIP, remainingAttempts: newRemainingAttempts });

      return NextResponse.json(
        {
          message: `Geçersiz kullanıcı adı veya şifre. ${newRemainingAttempts > 0 ? `Kalan deneme hakkı: ${newRemainingAttempts}` : 'Hesap geçici olarak bloklandı.'}`,
          remainingAttempts: newRemainingAttempts
        },
        { status: 401 }
      );
    }
  } catch (error) {
    logger.error('Login error', error instanceof Error ? error : new Error(String(error)));

    return NextResponse.json(
      { message: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}