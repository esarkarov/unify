import { Department } from '@/features/departments/types';

export interface Subject {
  id: number;
  code: string;
  name: string;
  description?: string;
  departmentId: number;
  createdAt: string;
  updatedAt: string;
  department: Department | null;
}
