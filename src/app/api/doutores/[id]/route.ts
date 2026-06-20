import { NextRequest, NextResponse } from 'next/server';
import { doctorsService } from '@/services/doctors.service';
import { doctorSchema } from '@/lib/validations/doctors';
import { getSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const doctor = await doctorsService.getDoctorById(id);

    return NextResponse.json(doctor);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar médico';
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
    const validation = doctorSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Atualizar médico
    const doctor = await doctorsService.updateDoctor(
      id,
      validation.data.name,
      validation.data.graduation
    );

    return NextResponse.json(doctor);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar médico';
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
    const result = await doctorsService.deleteDoctor(id);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar médico';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
