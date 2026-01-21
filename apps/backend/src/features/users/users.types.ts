import z from 'zod';

import { departments } from '@/features/departments/departments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { getUsersQuerySchema, paginationQuerySchema, userParamsSchema } from '@/features/users/users.validation';
import { user } from '@/shared/db/schema/auth.schema';

export type Department = typeof departments.$inferSelect;
export interface GetUserDepartmentsResponse {
  data: Department[];
  pagination: PaginationMeta;
}
export type GetUsersQuery = Partial<z.infer<typeof getUsersQuerySchema>>;

export interface GetUsersResponse {
  data: User[];
  pagination: PaginationMeta;
}

export interface GetUserSubjectsResponse {
  data: SubjectWithDepartment[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export type PaginationQuery = Partial<z.infer<typeof paginationQuerySchema>>;

export type Subject = typeof subjects.$inferSelect;

export interface SubjectWithDepartment {
  code: string;
  createdAt: Date;
  department: Department | null;
  departmentId: number;
  description: null | string;
  id: number;
  name: string;
  updatedAt: Date;
}
export type User = typeof user.$inferSelect;
export type UserParams = z.infer<typeof userParamsSchema>;
