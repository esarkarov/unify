import { Department } from '@/features/departments/departments.types';
import { subjects } from '@/features/subjects/subjects.schema';

export interface CreateSubjectDto {
  code: string;
  departmentId: number;
  description?: string;
  name: string;
}

export interface GetSubjectsQuery {
  department?: string;
  limit?: number | string;
  page?: number | string;
  search?: string;
}

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
