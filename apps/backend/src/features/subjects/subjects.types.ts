import z from 'zod';

import { Department } from '@/features/departments/departments.types';
import { subjects } from '@/features/subjects/subjects.schema';
import {
  createSubjectBodySchema,
  getSubjectClassesQuerySchema,
  getSubjectsQuerySchema,
  getSubjectUsersQuerySchema,
} from '@/features/subjects/subjects.validation';

export type CreateSubjectDto = z.infer<typeof createSubjectBodySchema>;

export type GetSubjectClassesQuery = Partial<z.infer<typeof getSubjectClassesQuerySchema>>;

export type GetSubjectsQuery = Partial<z.infer<typeof getSubjectsQuerySchema>>;

export type GetSubjectUsersQuery = Partial<z.infer<typeof getSubjectUsersQuerySchema>>;
export interface PaginatedSubjectsResponse {
  data: SubjectWithDepartment[];
  pagination: PaginationMeta;
}
export interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
export type Subject = typeof subjects.$inferSelect;
export type SubjectWithDepartment = Subject & {
  department: Department | null;
};
