import { NextRequest, NextResponse } from 'next/server';
import { requireRoles } from '@/lib/auth/authorization';
import { doctorScheduleSchema } from '@/lib/validations/doctor-schedules';
import { doctorSchedulesService } from '@/services/doctor-schedules.service';

export async function GET(request: NextRequest) {
  const accessResponse = await requireRoles(['admin', 'secretary']);
  if (accessResponse) return accessResponse;

  const doctorId = Number(request.nextUrl.searchParams.get('doctorId'));
  if (!Number.isInteger(doctorId) || doctorId < 1) {
    return NextResponse.json({ error: 'Médico inválido' }, { status: 400 });
  }

  try {
    const result = await doctorSchedulesService.getByDoctor(doctorId);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar horários';
    const status = message === 'Médico não encontrado' ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(request: NextRequest) {
  const accessResponse = await requireRoles(['admin', 'secretary']);
  if (accessResponse) return accessResponse;

  const body: unknown = await request.json().catch(() => null);
  const validation = doctorScheduleSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    }, { status: 400 });
  }

  try {
    const result = await doctorSchedulesService.replaceForDoctor(
      validation.data.doctorId,
      validation.data.schedules,
    );
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao salvar horários';
    const status = message === 'Médico não encontrado' ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}