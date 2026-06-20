import { NextRequest, NextResponse } from 'next/server';
import { appointmentsService } from '@/services/appointments.service';
import { appointmentSchema } from '@/lib/validations/appointments';
import { getSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const appointment = await appointmentsService.getAppointmentById(id);

    return NextResponse.json(appointment);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar agendamento';
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
    const validation = appointmentSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Atualizar agendamento
    const appointment = await appointmentsService.updateAppointment(
      id,
      validation.data.doctorId,
      validation.data.examId,
      validation.data.date,
      validation.data.startTime,
      validation.data.endTime,
      validation.data.phone
    );

    return NextResponse.json(appointment);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar agendamento';
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
    const result = await appointmentsService.deleteAppointment(id);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar agendamento';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
