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
