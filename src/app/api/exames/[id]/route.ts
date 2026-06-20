import { NextRequest, NextResponse } from 'next/server';
import { examsService } from '@/services/exams.service';
import { examSchema } from '@/lib/validations/exams';
import { getSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const exam = await examsService.getExamById(id);

    return NextResponse.json(exam);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar exame';
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
    const validation = examSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Atualizar exame
    const exam = await examsService.updateExam(
      id,
      validation.data.name,
      validation.data.slug,
      validation.data.information,
      validation.data.preparation,
      validation.data.procedureId
    );

    return NextResponse.json(exam);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar exame';
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
    const result = await examsService.deleteExam(id);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar exame';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
