import * as z from 'zod';

export const subjectCreateSchema = z.object({
  departmentId: z.coerce
    .number({
      required_error: 'Department is required',
      invalid_type_error: 'Department is required',
    })
    .min(1, 'Department is required'),
  name: z.string().min(3, 'Subject name must be at least 3 characters'),
  code: z.string().min(3, 'Subject code must be at least 3 characters'),
  description: z.string().min(5, 'Subject description must be at least 5 characters'),
});

export type SubjectFormValues = z.infer<typeof subjectCreateSchema>;
