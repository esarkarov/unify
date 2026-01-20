import { Status } from '@/features/subjects/types';
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

export const SIZE_CLASSES = {
  sm: 'size-7',
  md: 'size-8',
  lg: 'size-10',
} as const;

export const STATUS_VARIANTS: Record<Status, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  active: 'default',
  inactive: 'secondary',
  pending: 'outline',
  completed: 'default',
  cancelled: 'destructive',
};

export const DEPARTMENTS_PAGE_SIZE = 100;
export const ALL_DEPARTMENTS = 'all';
