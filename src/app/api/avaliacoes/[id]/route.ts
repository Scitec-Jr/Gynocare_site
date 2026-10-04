import { NextRequest, NextResponse } from 'next/server';
import { reviewsService } from '@/services/reviews.service';
import { reviewApprovalSchema, reviewSchema } from '@/lib/validations/reviews';
import { requireRoles } from '@/lib/auth/authorization';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accessResponse = await requireRoles(['admin', 'secretary']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const review = await reviewsService.getReviewById(parseInt(id));

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accessResponse = await requireRoles(['admin']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const reviewId = parseInt(id);

    const body = await request.json();

    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      return NextResponse.json({ errors }, { status: 400 });
    }

    const review = await reviewsService.updateReview(
      reviewId,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const accessResponse = await requireRoles(['admin']);
    if (accessResponse) return accessResponse;

    const { id } = await params;
    const reviewId = parseInt(id);

    const result = await reviewsService.deleteReview(reviewId);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao deletar avaliação';

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const accessResponse = await requireRoles(['admin', 'secretary']);
  if (accessResponse) return accessResponse;

  const validation = reviewApprovalSchema.safeParse(await request.json().catch(() => null));
  if (!validation.success) {
    return NextResponse.json(
      { error: 'A Secretária só pode aprovar uma avaliação.' },
      { status: 400 }
    );
  }

  try {
    const { id } = await params;
    const result = await reviewsService.approveReview(parseInt(id));
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao aprovar avaliação';
    const status = message === 'Avaliação não encontrada' ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}