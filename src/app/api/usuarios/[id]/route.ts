import { NextRequest, NextResponse } from 'next/server';
import { usersService } from '@/services/users.service';
import { userUpdateSchema } from '@/lib/validations/auth';
import { getSession } from '@/lib/auth/session';
import { hashPassword } from '@/lib/auth/passwords';
import { usersRepository } from '@/repositories/users.repository';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await usersService.getUserById(parseInt(id));

    return NextResponse.json(user);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar usuário';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const userId = parseInt(id);

    const body = await request.json();

    const validation = userUpdateSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      return NextResponse.json(
        { errors },
        { status: 400 }
      );
    }

    const { name, email, role, status, password } = validation.data;

    const user = await usersService.updateUser(userId, name, email, role);

    if (password) {
      const passwordHash = await hashPassword(password);
      await usersRepository.updatePassword(userId, passwordHash);
    }

    await usersService.updateStatus(userId, status);

    return NextResponse.json({ ...user, status });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar usuário';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const userId = parseInt(id);

    const result = await usersService.deleteUser(userId);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar usuário';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
