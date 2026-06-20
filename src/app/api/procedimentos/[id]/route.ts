import { NextRequest, NextResponse } from 'next/server';
import { proceduresService } from '@/services/procedures.service';
import { procedureSchema } from '@/lib/validations/procedures';
import { getSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const procedure = await proceduresService.getProcedureById(id);

    return NextResponse.json(procedure);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar procedimento';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
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

    // Atualizar procedimento
    const procedure = await proceduresService.updateProcedure(
      id,
      validation.data.name,
      validation.data.slug
    );

    return NextResponse.json(procedure);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar procedimento';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticação
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    const result = await proceduresService.deleteProcedure(id);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar procedimento';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
