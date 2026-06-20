import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Verificar se é uma rota protegida
  if (request.nextUrl.pathname.startsWith('/adm/')) {
    // Excluir a página de login
    if (request.nextUrl.pathname === '/adm/login') {
      return NextResponse.next();
    }

    // Verificar se existe sessão
    const sessionCookie = request.cookies.get('gynocare-session');
    if (!sessionCookie) {
      // Redirecionar para login
      return NextResponse.redirect(new URL('/adm/login', request.url));
    }

    // Tentar decodificar a sessão para validar
    try {
      const session = JSON.parse(
        Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
      );

      // Verificar expiração
      if (session.exp < Math.floor(Date.now() / 1000)) {
        // Sessão expirada, redirecionar para login
        return NextResponse.redirect(new URL('/adm/login', request.url));
      }
    } catch (error) {
      // Erro ao decodificar sessão, redirecionar para login
      return NextResponse.redirect(new URL('/adm/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/adm/:path*'],
};
