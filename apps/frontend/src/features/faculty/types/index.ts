export interface FacultyDepartment {
  id: number;
  name: string;
  code?: string | null;
  description?: string | null;
}

export interface FacultySubject {
  id: number;
  name: string;
  code?: string | null;
  description?: string | null;
  department?: {
    id: number;
    name: string;
    code?: string | null;
  } | null;
}
