import z from 'zod';

export const departmentCreateSchema = z.object({
  code: z.string().min(2, 'Department code must be at least 2 characters'),
  name: z.string().min(3, 'Department name must be at least 3 characters'),
  description: z.string().min(5, 'Department description must be at least 5 characters'),
});

export type DepartmentFormValues = z.infer<typeof departmentCreateSchema>;
