import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { user } from '@/shared/db/schema/auth.schema';
import { UserRoles } from '@/shared/types';

export type Class = typeof classes.$inferSelect;

export interface ClassWithRelations extends Class {
  subject: Subject;
  teacher: User;
}

export interface CreateDepartmentDto {
  code: string;
  description?: string;
  name: string;
}

export interface CreateDepartmentResponse {
  data: {
    id: number;
  };
}

export type Department = typeof departments.$inferSelect;

export interface DepartmentWithStats extends Department {
  totalSubjects: number;
}

export interface GetDepartmentClassesParams {
  limit?: number;
  page?: number;
}

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

export interface GetDepartmentsParams {
  limit?: number;
  page?: number;
  search?: string;
}

export interface GetDepartmentsResponse {
  data: DepartmentWithStats[];
  pagination: PaginationMeta;
}

export interface GetDepartmentSubjectsParams {
  limit?: number;
  page?: number;
}
export interface GetDepartmentSubjectsResponse {
  data: Subject[];
  pagination: PaginationMeta;
}

export interface GetDepartmentUsersParams {
  limit?: number;
  page?: number;
  role: UserRoles;
}

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

export type Subject = typeof subjects.$inferSelect;

export type User = typeof user.$inferSelect;
