import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

/**
 * Health check endpoint
 * Used for monitoring and deployment verification
 * Used for monitoring and deployment verification
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    checks: {
      database: 'unknown' as 'ok' | 'error' | 'unknown',
      redis: 'unknown' as 'ok' | 'error' | 'unknown',
    },
  };

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    health.checks.database = 'ok';
  } catch (error) {
    health.checks.database = 'error';
    health.status = 'error';
    logger.error('Database health check failed', error instanceof Error ? error : new Error(String(error)));
  }

  try {
    // Check Redis connection if configured
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const { Redis } = require('@upstash/redis');
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      await redis.ping();
      health.checks.redis = 'ok';
    } else {
      health.checks.redis = 'ok'; // Not required, so it's ok if not configured
    }
  } catch (error) {
    health.checks.redis = 'error';
    logger.warn('Redis health check failed', { error: error instanceof Error ? error.message : String(error) });
    // Redis is optional, so we don't mark overall status as error
  }

  const statusCode = health.status === 'ok' ? 200 : 503;
  return NextResponse.json(health, { status: statusCode });
}

