import { NextRequest, NextResponse } from 'next/server';
import { reviewsService } from '@/services/reviews.service';
import { reviewSchema } from '@/lib/validations/reviews';
import { getSession } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const statusParam = searchParams.get('status');
    const status = statusParam === 'true' ? true : statusParam === 'false' ? false : undefined;

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
