import { NextRequest, NextResponse } from 'next/server';
import { examsService } from '@/services/exams.service';
import { examSchema } from '@/lib/validations/exams';
import { getSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    // Parâmetros
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const procedureId = searchParams.get('procedimentoId');

    const offset = (page - 1) * limit;

    // Buscar exames
    const result = await examsService.getAllExams(
      limit,
      offset,
      search,
      procedureId ? Number(procedureId) : undefined
    );

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar exames';

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
    const validation = examSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      return NextResponse.json({ errors }, { status: 400 });
    }

    // Criar exame
    const exam = await examsService.createExam(
      validation.data.name,
      validation.data.slug,
      validation.data.information,
      validation.data.preparation,
      validation.data.procedureId
    );

    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar exame';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}