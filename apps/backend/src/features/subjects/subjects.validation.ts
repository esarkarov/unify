import { z } from 'zod';

export const getSubjectsQuerySchema = z.object({
  search: z.string().trim().optional(),
  department: z.string().trim().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const createSubjectBodySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255, 'Name too long'),
  code: z.string().trim().min(1, 'Code is required').max(50, 'Code too long'),
  departmentId: z.number().int().positive('Invalid department ID'),
  description: z.string().trim().optional(),
});

export const updateSubjectBodySchema = createSubjectBodySchema.partial();

export const subjectParamsSchema = z.object({
  id: z.coerce.number().int().positive('Invalid subject ID'),
});

export const subjectsValidation = {
  getSubjects: {
    query: getSubjectsQuerySchema,
  },

  createSubject: {
    body: createSubjectBodySchema,
  },

  updateSubject: {
    params: subjectParamsSchema,
    body: updateSubjectBodySchema,
  },

  getSubject: {
    params: subjectParamsSchema,
  },

  deleteSubject: {
    params: subjectParamsSchema,
  },
};

export type GetSubjectsQuery = z.infer<typeof getSubjectsQuerySchema>;
export type CreateSubjectBody = z.infer<typeof createSubjectBodySchema>;
export type UpdateSubjectBody = z.infer<typeof updateSubjectBodySchema>;
export type SubjectParams = z.infer<typeof subjectParamsSchema>;
