import { Department } from '@/features/departments/departments.types';
import { subjects } from '@/features/subjects/subjects.schema';

export interface GetSubjectsQuery {
  search?: string;
  department?: string;
  page?: string | number;
  limit?: string | number;
}

export interface CreateSubjectDto {
  departmentId: number;
  name: string;
  code: string;
  description?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type SubjectWithDepartment = Subject & {
  department: Department | null;
};

export interface PaginatedSubjectsResponse {
  data: SubjectWithDepartment[];
  pagination: PaginationMeta;
}

export type Subject = typeof subjects.$inferSelect;
