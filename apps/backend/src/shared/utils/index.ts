import { z } from 'zod';

export const commonSchemas = {
  date: z.coerce.date(),

  email: z.string().email('Invalid email address'),

  id: z.number().int().positive('Invalid ID'),

  optionalString: z.string().optional(),

  pagination: z.object({
    limit: z.coerce.number().int().positive().max(100).default(10),
    page: z.coerce.number().int().positive().default(1),
  }),

  search: z.object({
    search: z.string().optional(),
  }),

  stringField: (fieldName: string, maxLength: number = 255) =>
    z.string().min(1, `${fieldName} is required`).max(maxLength, `${fieldName} too long`),
};

export const createValidationSchema = {
  maxLength: (fieldName: string, max: number) => ({
    message: `${fieldName} must be at most ${max} characters`,
  }),

  minLength: (fieldName: string, min: number) => ({
    message: `${fieldName} must be at least ${min} characters`,
  }),

  positive: (fieldName: string) => ({
    message: `${fieldName} must be a positive number`,
  }),

  required: (fieldName: string) => ({
    message: `${fieldName} is required`,
  }),
};
