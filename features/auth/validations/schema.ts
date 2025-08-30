import { email, requiredString } from '@/lib/schema-helper';
import { z } from 'zod/v3';

export const loginSchema = z.object({
    email: email('Email'),
    password: requiredString('Password'),
});