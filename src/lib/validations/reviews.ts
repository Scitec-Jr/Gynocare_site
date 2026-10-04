import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.number().optional(),
  rating: z.number().min(1).max(5),
  text: z.string().max(500).optional(),
  status: z.boolean().default(true),
});

export const reviewApprovalSchema = z.object({
  status: z.literal(true),
});

export const publicReviewSchema = z.object({
  rating: z.number().int().min(1, 'Selecione uma nota de 1 a 5').max(5, 'Selecione uma nota de 1 a 5'),
  text: z.string().trim().min(1, 'Escreva uma avaliação').max(500, 'A avaliação deve ter no máximo 500 caracteres'),
});

export type ReviewRequest = z.infer<typeof reviewSchema>;
export type PublicReviewRequest = z.infer<typeof publicReviewSchema>;
