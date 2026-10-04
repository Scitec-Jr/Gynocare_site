import { z } from 'zod';

const scheduleEntrySchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Horário inicial inválido'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Horário final inválido'),
});

export const doctorScheduleSchema = z.object({
  doctorId: z.number().int().positive('Médico inválido'),
  schedules: z.array(scheduleEntrySchema).max(28, 'Máximo de quatro turnos por dia'),
}).superRefine(({ schedules }, context) => {
  const schedulesByDay = new Map<number, { index: number; start: number; end: number }[]>();

  schedules.forEach((schedule, index) => {
    const start = Number(schedule.startTime.slice(0, 2)) * 60 + Number(schedule.startTime.slice(3, 5));
    const end = Number(schedule.endTime.slice(0, 2)) * 60 + Number(schedule.endTime.slice(3, 5));

    if (start >= end) {
      context.addIssue({
        code: 'custom',
        path: ['schedules', index, 'endTime'],
        message: 'O horário final deve ser posterior ao inicial',
      });
      return;
    }

    const daySchedules = schedulesByDay.get(schedule.dayOfWeek) ?? [];
    const overlap = daySchedules.some((existing) => start < existing.end && end > existing.start);

    if (overlap) {
      context.addIssue({
        code: 'custom',
        path: ['schedules', index],
        message: 'Os turnos do mesmo dia não podem se sobrepor',
      });
    }

    daySchedules.push({ index, start, end });
    schedulesByDay.set(schedule.dayOfWeek, daySchedules);
  });
});

export type DoctorScheduleRequest = z.infer<typeof doctorScheduleSchema>;