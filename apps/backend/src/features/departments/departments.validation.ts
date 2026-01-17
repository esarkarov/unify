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

  getDepartments: {
    query: getDepartmentsQuerySchema,
  },

  updateDepartment: {
    body: updateDepartmentBodySchema,
    params: departmentParamsSchema,
  },
};

export type CreateDepartmentBody = z.infer<typeof createDepartmentBodySchema>;
export type DepartmentParams = z.infer<typeof departmentParamsSchema>;
export type GetDepartmentsQuery = z.infer<typeof getDepartmentsQuerySchema>;
export type UpdateDepartmentBody = z.infer<typeof updateDepartmentBodySchema>;
