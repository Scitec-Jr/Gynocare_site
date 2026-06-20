import { z } from 'zod';

export const doctorSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(150),
  graduation: z.string().min(3, 'Especialidade obrigatória').max(255),
});

export type DoctorRequest = z.infer<typeof doctorSchema>;
