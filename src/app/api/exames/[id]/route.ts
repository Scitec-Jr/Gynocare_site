import { NextRequest, NextResponse } from 'next/server';
import { examsService } from '@/services/exams.service';
import { examSchema } from '@/lib/validations/exams';
import { getSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const exam = await examsService.getExamById(parseInt(id));

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
    const examId = parseInt(id);

    const body = await request.json();

    const validation = examSchema.safeParse(body);

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

    const exam = await examsService.updateExam(
      examId,
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
    const examId = parseInt(id);

    const result = await examsService.deleteExam(examId);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar exame';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}