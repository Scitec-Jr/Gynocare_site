import { createHmac, timingSafeEqual } from 'node:crypto';
import { isUserRole, type UserRole } from '@/lib/auth/roles';

export interface SessionClaims {
  userId: number;
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.trim().length < 32) {
    throw new Error('SESSION_SECRET precisa ter pelo menos 32 caracteres');
  }
  return secret;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createSessionToken(session: SessionClaims): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  return `${payload}.${sign(payload, getSessionSecret())}`;
}

export function readSessionToken(token: string): SessionClaims | null {
  try {
    const [payload, signature, extra] = token.split('.');
    if (!payload || !signature || extra !== undefined) return null;

    const expectedSignature = Buffer.from(sign(payload, getSessionSecret()));
    const providedSignature = Buffer.from(signature);
    if (
      expectedSignature.length !== providedSignature.length ||
      !timingSafeEqual(expectedSignature, providedSignature)
    ) {
      return null;
    }

    const session: unknown = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (
      typeof session !== 'object' ||
      session === null ||
      !('userId' in session) ||
      !Number.isInteger(session.userId) ||
      !('email' in session) ||
      typeof session.email !== 'string' ||
      !('name' in session) ||
      typeof session.name !== 'string' ||
      !('role' in session) ||
      !isUserRole(session.role) ||
      !('iat' in session) ||
      typeof session.iat !== 'number' ||
      !('exp' in session) ||
      typeof session.exp !== 'number' ||
      session.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return session as SessionClaims;
  } catch {
    return null;
  }
}