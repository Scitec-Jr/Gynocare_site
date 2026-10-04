import { NextRequest, NextResponse } from 'next/server';
import { appointmentsService } from '@/services/appointments.service';
import { appointmentSchema } from '@/lib/validations/appointments';
import { requireRoles } from '@/lib/auth/authorization';
import { getSession } from '@/lib/auth/session';
import { getSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const accessResponse = await requireRoles(['admin', 'doctor', 'secretary']);
    if (accessResponse) return accessResponse;

    // Parâmetros
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    // Buscar agendamentos
    const result = await appointmentsService.getAllAppointments(limit, offset, search);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar agendamentos';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (session) {
      const accessResponse = await requireRoles(['admin']);
      if (accessResponse) return accessResponse;
    }

    const body = await request.json();

    console.log(appointmentSchema.safeParse(body))

    // Validar input
    const validation = appointmentSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Criar agendamento
    const appointment = await appointmentsService.createAppointment(
      validation.data.doctorId,
      validation.data.examId,
      validation.data.date,
      validation.data.startTime,
      validation.data.endTime,
      validation.data.phone
    );

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.log(error)
    const message = error instanceof Error ? error.message : 'Erro ao criar agendamento';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
