import { z } from 'zod';

export const procedureSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(150),
  slug: z.string().min(3).max(150),
});

export type ProcedureRequest = z.infer<typeof procedureSchema>;
