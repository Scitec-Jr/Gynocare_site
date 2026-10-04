import { NextRequest, NextResponse } from 'next/server';
import { requireRoles } from '@/lib/auth/authorization';
import { doctorExamsSchema } from '@/lib/validations/doctor-exams';
import { doctorExamsService } from '@/services/doctor-exams.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function readDoctorId(context: RouteContext): Promise<number | null> {
  const { id } = await context.params;
  const doctorId = Number(id);
  return Number.isInteger(doctorId) && doctorId > 0 ? doctorId : null;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const accessResponse = await requireRoles(['admin']);
  if (accessResponse) return accessResponse;

  const doctorId = await readDoctorId(context);
  if (!doctorId) {
    return NextResponse.json({ error: 'Médico inválido' }, { status: 400 });
  }

  try {
    return NextResponse.json(await doctorExamsService.getExamIds(doctorId));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar exames do médico';
    const status = message === 'Médico não encontrado' ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const accessResponse = await requireRoles(['admin']);
  if (accessResponse) return accessResponse;

  const doctorId = await readDoctorId(context);
  if (!doctorId) {
    return NextResponse.json({ error: 'Médico inválido' }, { status: 400 });
  }

  const body: unknown = await request.json().catch(() => null);
  const validation = doctorExamsSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    }, { status: 400 });
  }

  try {
    return NextResponse.json(
      await doctorExamsService.replaceExams(doctorId, validation.data.examIds),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar exames do médico';
    const status = message === 'Médico não encontrado'
      ? 404
      : message === 'Um ou mais exames selecionados não existem'
        ? 400
        : 500;
    return NextResponse.json({ error: message }, { status });
  }
}