import { NextRequest, NextResponse } from 'next/server';
import { reviewsService } from '@/services/reviews.service';
import { publicReviewSchema } from '@/lib/validations/reviews';
import { getSession } from '@/lib/auth/session';
import { requireRoles } from '@/lib/auth/authorization';
import type { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const session = await getSession();
    let status: boolean | undefined = true;

    if (session?.role === 'admin' || session?.role === 'secretary') {
      const accessResponse = await requireRoles(['admin', 'secretary']);
      if (accessResponse) return accessResponse;

      const statusParam = searchParams.get('status');
      status = statusParam === 'true' ? true : statusParam === 'false' ? false : undefined;
    }

    const offset = (page - 1) * limit;

    const result = await reviewsService.getAllReviews(limit, offset, status);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao buscar avaliações';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const validation = publicReviewSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({
      errors: validation.error.issues.map((issue: ZodError['issues'][number]) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    }, { status: 400 });
  }

  try {
    const review = await reviewsService.createPendingReview(
      validation.data.rating,
      validation.data.text,
    );
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao enviar avaliação';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
