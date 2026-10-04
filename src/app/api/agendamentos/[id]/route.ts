import { NextRequest, NextResponse } from 'next/server';
import { appointmentsService } from '@/services/appointments.service';
import { appointmentSchema } from '@/lib/validations/appointments';
import { requireRoles } from '@/lib/auth/authorization';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accessResponse = await requireRoles(['admin', 'doctor', 'secretary']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const appointment = await appointmentsService.getAppointmentById(parseInt(id));

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accessResponse = await requireRoles(['admin']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const appointmentId = parseInt(id);

    const body = await request.json();

    const validation = appointmentSchema.safeParse(body);

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

    const appointment = await appointmentsService.updateAppointment(
      appointmentId,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accessResponse = await requireRoles(['admin']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const appointmentId = parseInt(id);

    const result = await appointmentsService.deleteAppointment(appointmentId);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar agendamento';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}