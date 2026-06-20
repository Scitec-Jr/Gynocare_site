import { NextRequest, NextResponse } from 'next/server';
import { proceduresService } from '@/services/procedures.service';
import { procedureSchema } from '@/lib/validations/procedures';
import { getSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    // Parâmetros
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    // Buscar procedimentos
    const result = await proceduresService.getAllProcedures(limit, offset, search);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar procedimentos';
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
    const validation = procedureSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Criar procedimento
    const procedure = await proceduresService.createProcedure(
      validation.data.name,
      validation.data.slug
    );

    return NextResponse.json(procedure, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar procedimento';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
