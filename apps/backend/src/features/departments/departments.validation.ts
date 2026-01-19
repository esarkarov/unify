import { z } from 'zod';

export const getDepartmentsQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
  search: z.string().trim().optional(),
});

export const createDepartmentBodySchema = z.object({
  code: z.string().trim().min(1, 'Code is required').max(50, 'Code too long'),
  description: z.string().trim().optional(),
  name: z.string().trim().min(1, 'Name is required').max(255, 'Name too long'),
});

export const updateDepartmentBodySchema = createDepartmentBodySchema.partial();

export const departmentParamsSchema = z.object({
  id: z.coerce.number().int().positive('Invalid department ID'),
});

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
});

export const departmentUsersQuerySchema = paginationQuerySchema.extend({
  role: z.enum(['teacher', 'student', 'admin'], {
    errorMap: () => ({ message: 'Role must be either teacher, student, or admin' }),
  }),
});

export const departmentsValidation = {
  createDepartment: {
    body: createDepartmentBodySchema,
  },

  deleteDepartment: {
    params: departmentParamsSchema,
  },

  getDepartment: {
    params: departmentParamsSchema,
  },

  getDepartmentClasses: {
    params: departmentParamsSchema,
    query: paginationQuerySchema,
  },

  getDepartments: {
    query: getDepartmentsQuerySchema,
  },

  getDepartmentSubjects: {
    params: departmentParamsSchema,
    query: paginationQuerySchema,
  },

  getDepartmentUsers: {
    params: departmentParamsSchema,
    query: departmentUsersQuerySchema,
  },

  updateDepartment: {
    body: updateDepartmentBodySchema,
    params: departmentParamsSchema,
  },
};

export type CreateDepartmentBody = z.infer<typeof createDepartmentBodySchema>;
export type DepartmentParams = z.infer<typeof departmentParamsSchema>;
export type DepartmentUsersQuery = z.infer<typeof departmentUsersQuerySchema>;
export type GetDepartmentsQuery = z.infer<typeof getDepartmentsQuerySchema>;
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
export type UpdateDepartmentBody = z.infer<typeof updateDepartmentBodySchema>;
