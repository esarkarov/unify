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

export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
