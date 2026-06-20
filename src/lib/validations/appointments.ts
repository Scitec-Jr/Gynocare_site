import { z } from 'zod';

export const appointmentSchema = z.object({
  id: z.number().optional(),
  doctorId: z.number().positive('Médico inválido'),
  examId: z.number().positive('Exame inválido'),
  date: z.string().date('Data inválida'),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato HH:mm'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'Formato HH:mm'),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone inválido'),
});

export type AppointmentRequest = z.infer<typeof appointmentSchema>;
