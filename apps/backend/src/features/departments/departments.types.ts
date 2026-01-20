import z from 'zod';

import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import {
  createDepartmentBodySchema,
  departmentUsersQuerySchema,
  getDepartmentsQuerySchema,
  paginationQuerySchema,
} from '@/features/departments/departments.validation';
import { subjects } from '@/features/subjects/subjects.schema';
import { user } from '@/shared/db/schema/auth.schema';

export type Class = typeof classes.$inferSelect;

export interface ClassWithRelations extends Class {
  subject: null | Subject;
  teacher: null | User;
}

export type CreateDepartmentDto = z.infer<typeof createDepartmentBodySchema>;
export interface CreateDepartmentResponse {
  data: {
    id: number;
  };
}
export type Department = typeof departments.$inferSelect;
export type DepartmentUsersQuery = z.infer<typeof departmentUsersQuerySchema>;
export interface DepartmentWithStats extends Department {
  totalSubjects: number;
}

export type GetDepartmentClassesQuery = PaginationQuery;

export interface GetDepartmentClassesResponse {
  data: ClassWithRelations[];
  pagination: PaginationMeta;
}

export interface GetDepartmentDetailsResponse {
  department: Department;
  totals: {
    classes: number;
    enrolledStudents: number;
    subjects: number;
  };
}

export type GetDepartmentsQuery = Partial<z.infer<typeof getDepartmentsQuerySchema>>;

export interface GetDepartmentsResponse {
  data: DepartmentWithStats[];
  pagination: PaginationMeta;
}

export type GetDepartmentSubjectsQuery = PaginationQuery;

export interface GetDepartmentSubjectsResponse {
  data: Subject[];
  pagination: PaginationMeta;
}

export type GetDepartmentUsersQuery = Partial<z.infer<typeof departmentUsersQuerySchema>>;

export interface GetDepartmentUsersResponse {
  data: User[];
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

export type User = typeof user.$inferSelect;
