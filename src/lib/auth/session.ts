import { cookies } from 'next/headers';
import { createSessionToken, readSessionToken, type SessionClaims } from '@/lib/auth/session-token';
import type { UserRole } from '@/lib/auth/roles';

export const SESSION_COOKIE_NAME = 'gynocare-session';
export const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 horas

export interface Session extends SessionClaims {}

export async function createSessionCookie(
  sessionData: Omit<Session, 'iat' | 'exp'>
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const session: Session = {
    ...sessionData,
    iat: now,
    exp: now + SESSION_EXPIRY_MS / 1000,
  };

  const cookieStore = await cookies();
  
  // Simular JWT com JSON (seguro porque está em HTTP Only cookie)
  const sessionToken = createSessionToken(session);
  
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_EXPIRY_MS / 1000,
    path: '/',
  });

  return sessionToken;
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return null;
    }

    const session = readSessionToken(sessionToken);
    if (!session) {
      await deleteSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function validateSession(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

export type { UserRole };
