import { z } from 'zod';

export const doctorExamsSchema = z.object({
  examIds: z.array(z.number().int().positive('Exame inválido')).max(500, 'Quantidade de exames inválida'),
}).superRefine(({ examIds }, context) => {
  if (new Set(examIds).size !== examIds.length) {
    context.addIssue({
      code: 'custom',
      path: ['examIds'],
      message: 'Não é possível selecionar o mesmo exame mais de uma vez',
    });
  }
});

export type DoctorExamsRequest = z.infer<typeof doctorExamsSchema>;