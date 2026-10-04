import { NextRequest, NextResponse } from 'next/server';
import { requireRoles } from '@/lib/auth/authorization';
import { unavailableDateSchema } from '@/lib/validations/unavailable-dates';
import { unavailableDatesService } from '@/services/unavailable-dates.service';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const accessResponse = await requireRoles(['admin', 'secretary']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const validation = unavailableDateSchema.safeParse(await request.json());
    if (!validation.success) {
      return NextResponse.json({
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      }, { status: 400 });
    }

    const result = await unavailableDatesService.update(
      parseInt(id),
      validation.data.doctorId,
      validation.data.date,
    );
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar indisponibilidade';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const accessResponse = await requireRoles(['admin', 'secretary']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const result = await unavailableDatesService.delete(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao excluir indisponibilidade';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
