import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(20),
  email: z
    .string()
    .min(5, {
      message: 'Email must be at least 5 characters.',
    })
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
