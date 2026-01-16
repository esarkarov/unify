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

  getSubjects: {
    query: getSubjectsQuerySchema,
  },

  updateSubject: {
    body: updateSubjectBodySchema,
    params: subjectParamsSchema,
  },
};

export type CreateSubjectBody = z.infer<typeof createSubjectBodySchema>;
export type GetSubjectsQuery = z.infer<typeof getSubjectsQuerySchema>;
export type SubjectParams = z.infer<typeof subjectParamsSchema>;
export type UpdateSubjectBody = z.infer<typeof updateSubjectBodySchema>;
