import { NextRequest, NextResponse } from 'next/server';
import { doctorsService } from '@/services/doctors.service';
import { doctorSchema } from '@/lib/validations/doctors';
import { getSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    // Parâmetros
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const examId = searchParams.get('exameId');

    const offset = (page - 1) * limit;

    // Buscar médicos
    const result = await doctorsService.getAllDoctors(
      limit,
      offset,
      search,
      examId ? Number(examId) : undefined
    );

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar médicos';

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
    const validation = doctorSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      return NextResponse.json({ errors }, { status: 400 });
    }

    // Criar médico
    const doctor = await doctorsService.createDoctor(
      validation.data.name,
      validation.data.graduation
    );

    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar médico';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}