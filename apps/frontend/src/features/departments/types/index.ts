export interface Department {
  id: number;
  code: string;
  name: string;
  description?: string;
}
export interface DepartmentListItem {
  id: number;
  name: string;
  code?: string | null;
  description?: string | null;
  totalSubjects?: number | null;
}

export interface DepartmentDetails {
  department: Department;
  totals: {
    subjects: number;
    classes: number;
    enrolledStudents: number;
  };
}

export interface DepartmentSubject {
  id: number;
  name: string;
  code?: string | null;
  description?: string | null;
  createdAt?: string | null;
}

export interface DepartmentClass {
  id: number;
  name: string;
  status?: string | null;
  capacity?: number | null;
  subject?: {
    id: number;
    name: string;
    code?: string | null;
  } | null;
  teacher?: {
    id: string;
    name: string;
    email?: string | null;
    image?: string | null;
  } | null;
}

export interface DepartmentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}
