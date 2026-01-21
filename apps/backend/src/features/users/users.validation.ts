import { z } from 'zod';

export const getUsersQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
  role: z.enum(['teacher', 'student']).optional(),
  search: z.string().trim().optional(),
});

export const userParamsSchema = z.object({
  id: z.string().trim().min(1, 'Invalid user ID'),
});

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
});

export const usersValidation = {
  getUser: {
    params: userParamsSchema,
  },

  getUserDepartments: {
    params: userParamsSchema,
    query: paginationQuerySchema,
  },

  getUsers: {
    query: getUsersQuerySchema,
  },

  getUserSubjects: {
    params: userParamsSchema,
    query: paginationQuerySchema,
  },
};
