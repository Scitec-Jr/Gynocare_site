import { z } from 'zod';

export const examSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(150),
  slug: z.string().min(3).max(150),
  information: z.string().min(10, 'Informação deve ter no mínimo 10 caracteres'),
  preparation: z.string().min(10, 'Preparação deve ter no mínimo 10 caracteres'),
  procedureId: z.number().positive('Procedimento inválido'),
});

export type ExamRequest = z.infer<typeof examSchema>;
