import { z } from 'zod';

export const getSubjectsQuerySchema = z.object({
  department: z.string().trim().optional(),
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
  search: z.string().trim().optional(),
});

export const createSubjectBodySchema = z.object({
  code: z.string().trim().min(1, 'Code is required').max(50, 'Code too long'),
  departmentId: z.number().int().positive('Invalid department ID'),
  description: z.string().trim().optional(),
  name: z.string().trim().min(1, 'Name is required').max(255, 'Name too long'),
});

export const updateSubjectBodySchema = createSubjectBodySchema.partial();

export const subjectParamsSchema = z.object({
  id: z.coerce.number().int().positive('Invalid subject ID'),
});

export const getSubjectClassesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
});

export const getSubjectUsersQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
  role: z.enum(['teacher', 'student', 'admin'], {
    errorMap: () => ({ message: 'Role must be either teacher, student, or admin' }),
  }),
});

export const subjectsValidation = {
  createSubject: {
    body: createSubjectBodySchema,
  },

  deleteSubject: {
    params: subjectParamsSchema,
  },

  getSubject: {
    params: subjectParamsSchema,
  },

  getSubjectClasses: {
    params: subjectParamsSchema,
    query: getSubjectClassesQuerySchema,
  },

  getSubjects: {
    query: getSubjectsQuerySchema,
  },

  getSubjectUsers: {
    params: subjectParamsSchema,
    query: getSubjectUsersQuerySchema,
  },

  updateSubject: {
    body: updateSubjectBodySchema,
    params: subjectParamsSchema,
  },
};
