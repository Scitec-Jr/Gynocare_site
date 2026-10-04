import { NextRequest, NextResponse } from 'next/server';
import { proceduresService } from '@/services/procedures.service';
import { procedureSchema } from '@/lib/validations/procedures';
import { requireRoles } from '@/lib/auth/authorization';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const procedure = await proceduresService.getProcedureById(parseInt(id));

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accessResponse = await requireRoles(['admin']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const procedureId = parseInt(id);

    const body = await request.json();

    const validation = procedureSchema.safeParse(body);

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

    const procedure = await proceduresService.updateProcedure(
      procedureId,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accessResponse = await requireRoles(['admin']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const procedureId = parseInt(id);

    const result = await proceduresService.deleteProcedure(procedureId);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar procedimento';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}