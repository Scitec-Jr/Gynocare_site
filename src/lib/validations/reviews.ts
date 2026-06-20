import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.number().optional(),
  rating: z.number().min(1).max(5),
  text: z.string().max(500).optional(),
  status: z.boolean().default(true),
});

export type ReviewRequest = z.infer<typeof reviewSchema>;
