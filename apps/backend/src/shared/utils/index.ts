import { z } from 'zod';

export const commonSchemas = {
  id: z.number().int().positive('Invalid ID'),

  pagination: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
  }),

  search: z.object({
    search: z.string().optional(),
  }),

  stringField: (fieldName: string, maxLength: number = 255) =>
    z.string().min(1, `${fieldName} is required`).max(maxLength, `${fieldName} too long`),

  optionalString: z.string().optional(),

  email: z.string().email('Invalid email address'),

  date: z.coerce.date(),
};

export const createValidationSchema = {
  required: (fieldName: string) => ({
    message: `${fieldName} is required`,
  }),

  maxLength: (fieldName: string, max: number) => ({
    message: `${fieldName} must be at most ${max} characters`,
  }),

  minLength: (fieldName: string, min: number) => ({
    message: `${fieldName} must be at least ${min} characters`,
  }),

  positive: (fieldName: string) => ({
    message: `${fieldName} must be a positive number`,
  }),
};
