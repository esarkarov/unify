import { SubjectFormValues } from '@/features/subjects/validation';

export const DEPARTMENTS = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Geography',
  'Economics',
  'Business Administration',
  'Engineering',
  'Psychology',
  'Sociology',
  'Political Science',
  'Philosophy',
  'Education',
  'Fine Arts',
  'Music',
  'Physical Education',
  'Law',
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
  value: dept,
  label: dept,
}));

export const DEFAULT_VALUES: SubjectFormValues = {
  departmentId: 0,
  name: '',
  code: '',
  description: '',
};

export const DEPARTMENTS_PAGE_SIZE = 100;
export const ALL_DEPARTMENTS = 'all';
