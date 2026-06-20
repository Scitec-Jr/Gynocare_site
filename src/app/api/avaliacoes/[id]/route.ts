import { NextRequest, NextResponse } from 'next/server';
import { reviewsService } from '@/services/reviews.service';
import { reviewSchema } from '@/lib/validations/reviews';
import { getSession } from '@/lib/auth/session';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const review = await reviewsService.getReviewById(id);

    return NextResponse.json(review);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar avaliação';
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
    const validation = reviewSchema.safeParse(body);
    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Atualizar avaliação
    const review = await reviewsService.updateReview(
      id,
      validation.data.rating,
      validation.data.text || null,
      validation.data.status
    );

    return NextResponse.json(review);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao atualizar avaliação';
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
    const result = await reviewsService.deleteReview(id);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar avaliação';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
