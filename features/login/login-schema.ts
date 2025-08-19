import { requiredString } from '@/lib/schema-helper';
import { z } from 'zod/v3';

export const loginSchema = z.object({
    email: requiredString('Email'),
    password: requiredString('Password'),
})

export type LoginType = z.infer<typeof loginSchema>;