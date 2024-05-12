import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(30),
  email: z
    .string()
    .min(5, {
      message: 'Email must be at least 5 characters.',
    })
    .max(30)
    .email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one symbol' }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const profileSchema = z.object({
  fullName: z.string().min(3, {
    message: 'Full Name must be at least 3 characters.',
  }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(5, {
      message: 'Email must be at least 5 characters.',
    })
    .max(30)
    .email(),
  password: z
    .string()
    .min(5, {
      message: 'Password must be at least 5 characters.',
    })
    .max(30),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const todoSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(3).max(255),
  finished: z.boolean().optional(),
});

export type TodoSchema = z.infer<typeof todoSchema>;
