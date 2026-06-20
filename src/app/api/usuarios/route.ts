import { NextRequest, NextResponse } from 'next/server';
import { usersService } from '@/services/users.service';
import { userSchema } from '@/lib/validations/auth';
import { getSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    // Parâmetros
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    // Buscar usuários
    const result = await usersService.getAllUsers(limit, offset, search);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar usuários';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validar input
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Criar usuário
    const user = await usersService.createUser(
      validation.data.name,
      validation.data.email,
      validation.data.password,
      validation.data.role || 'secretary'
    );

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar usuário';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
