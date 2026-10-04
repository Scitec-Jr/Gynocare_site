import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import type { UserRole } from '@/lib/auth/roles';
import { usersRepository } from '@/repositories/users.repository';

export async function requireRoles(allowedRoles: readonly UserRole[]): Promise<NextResponse | null> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const user = await usersRepository.findById(session.userId);
  if (!user || !user.Ativo || user.Funcao !== session.role) {
    return NextResponse.json({ error: 'Sessão inválida ou usuário inativo' }, { status: 401 });
  }

  if (!allowedRoles.includes(user.Funcao)) {
    return NextResponse.json({ error: 'Sem permissão para esta ação' }, { status: 403 });
  }

  return null;
}