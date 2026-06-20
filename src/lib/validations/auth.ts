import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(150),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional(),
  role: z.enum(['admin', 'doctor', 'secretary']),
  status: z.boolean().default(true),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

export type LoginRequest = z.infer<typeof loginSchema>;
export type UserRequest = z.infer<typeof userSchema>;
export type UpdatePasswordRequest = z.infer<typeof updatePasswordSchema>;
