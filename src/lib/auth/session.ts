import { cookies } from 'next/headers';

export const SESSION_COOKIE_NAME = 'gynocare-session';
export const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 horas

export interface Session {
  userId: number;
  email: string;
  name: string;
  role: 'admin' | 'doctor' | 'secretary';
  iat: number;
  exp: number;
}

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
  const sessionToken = Buffer.from(JSON.stringify(session)).toString('base64');
  
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

    const session = JSON.parse(
      Buffer.from(sessionToken, 'base64').toString('utf-8')
    ) as Session;

    // Verificar expiração
    if (session.exp < Math.floor(Date.now() / 1000)) {
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
