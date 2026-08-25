import { z } from 'zod';

export const unavailableDateSchema = z.object({
  doctorId: z.number().positive('Médico inválido'),
  date: z.string().date('Data inválida'),
});

export type UnavailableDateRequest = z.infer<typeof unavailableDateSchema>;
