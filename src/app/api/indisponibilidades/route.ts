import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { unavailableDateSchema } from '@/lib/validations/unavailable-dates';
import { unavailableDatesService } from '@/services/unavailable-dates.service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const result = await unavailableDatesService.getAll(limit, (page - 1) * limit, search);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar indisponibilidades';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

    const validation = unavailableDateSchema.safeParse(await request.json());
    if (!validation.success) {
      return NextResponse.json({
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      }, { status: 400 });
    }

    const result = await unavailableDatesService.create(
      validation.data.doctorId,
      validation.data.date,
    );
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar indisponibilidade';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
