import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { signToken, verifyToken } from '@/lib/jwt';

const SESSION_COOKIE_NAME = 'admin_session';

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(request?: NextRequest): Promise<boolean> {
  try {
    let token: string | undefined;

    if (request) {
      // API or Middleware context
      token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    } else {
      // Server Component context
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    }

    if (!token) return false;

    const payload = await verifyToken(token);
    return !!payload;
  } catch (error) {
    return false;
  }
}

/**
 * Get current user from session
 */
export async function getCurrentUser(request?: NextRequest) {
  try {
    let token: string | undefined;

    if (request) {
      token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    } else {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    }

    if (!token) return null;

    return await verifyToken(token);
  } catch (error) {
    return null;
  }
}

/**
 * Set authentication session
 */
export async function setAuthSession(username: string) {
  const token = await signToken({ username });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * Clear authentication session
 */
export async function clearAuthSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Require authentication middleware (helper)
 */
export async function requireAuth(request?: NextRequest) {
  const isAuth = await isAuthenticated(request);
  if (!isAuth) {
    throw new Error('Unauthorized');
  }
}


