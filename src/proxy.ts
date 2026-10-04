import { NextRequest, NextResponse } from 'next/server';
import { canAccessAdminPath, roleHome } from '@/lib/auth/roles';
import { readSessionToken } from '@/lib/auth/session-token';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname !== '/adm' && !pathname.startsWith('/adm/')) return NextResponse.next();
  if (pathname === '/adm/login') return NextResponse.next();

  const sessionCookie = request.cookies.get('gynocare-session');
  const session = sessionCookie ? readSessionToken(sessionCookie.value) : null;
  if (!session) return NextResponse.redirect(new URL('/adm/login', request.url));

  if (!canAccessAdminPath(session.role, pathname)) {
    return NextResponse.redirect(new URL(roleHome[session.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adm', '/adm/:path*'],
};
