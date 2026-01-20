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

export interface SubjectDetails {
  subject: Subject & {
    department?: Department | null;
  };
  totals: {
    classes: number;
  };
}

export interface SubjectClass {
  id: number;
  name: string;
  status?: string | null;
  capacity?: number | null;
  teacher?: {
    id: string;
    name: string;
    email?: string | null;
    image?: string | null;
  } | null;
}

export interface SubjectUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}

export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';
export interface Filter {
  field: string;
  operator: 'eq' | 'contains';
  value: string;
}
