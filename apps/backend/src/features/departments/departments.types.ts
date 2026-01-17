import { departments } from '@/features/departments/departments.schema';
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

export interface GetDepartmentsParams {
  limit?: number;
  page?: number;
  search?: string;
}

export interface GetDepartmentsResponse {
  data: DepartmentWithStats[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
