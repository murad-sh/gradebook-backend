import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const loginRequestSchema = z.object({
  body: loginSchema,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
