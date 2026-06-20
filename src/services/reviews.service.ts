import { reviewsRepository } from '@/repositories/reviews.repository';

export class ReviewsService {
  async getAllReviews(limit: number = 10, offset: number = 0, status?: boolean) {
    const reviews = await reviewsRepository.findAll(limit, offset, status);
    const total = await reviewsRepository.countAll(status);

    return {
      data: reviews.map(rev => ({
        id: rev.Id,
        rating: rev.Nota,
        text: rev.Texto,
        status: rev.Status,
        createdAt: rev.Criado_em,
        updatedAt: rev.Atualizado_em,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getReviewById(id: number) {
    const review = await reviewsRepository.findById(id);
    if (!review) {
      throw new Error('Avaliação não encontrada');
    }

    return {
      id: review.Id,
      rating: review.Nota,
      text: review.Texto,
      status: review.Status,
      createdAt: review.Criado_em,
      updatedAt: review.Atualizado_em,
    };
  }

  async updateReview(id: number, rating: number, text: string | null, status: boolean) {
    if (rating < 1 || rating > 5) {
      throw new Error('Avaliação deve estar entre 1 e 5');
    }

    const success = await reviewsRepository.update(id, rating, text, status);
    if (!success) {
      throw new Error('Falha ao atualizar avaliação');
    }

    return { id, rating, text, status };
  }

  async deleteReview(id: number) {
    const success = await reviewsRepository.delete(id);
    if (!success) {
      throw new Error('Falha ao deletar avaliação');
    }
    return { success: true };
  }
}

export const reviewsService = new ReviewsService();
