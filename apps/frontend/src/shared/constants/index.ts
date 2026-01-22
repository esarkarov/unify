import { GraduationCap, School } from 'lucide-react';

export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
export const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
export const PAGE_SIZE = 10;
export const DEFAULT_MAX_FILE_SIZE = 5_000_000;
export const DEFAULT_ALLOWED_FORMATS = ['png', 'jpg', 'jpeg'];
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};
export const ROLE_OPTIONS = [
  {
    value: USER_ROLES.STUDENT,
    label: 'Student',
    icon: GraduationCap,
  },
  {
    value: USER_ROLES.TEACHER,
    label: 'Teacher',
    icon: School,
  },
];

export const SEARCHABLE_FIELDS: Record<string, string[]> = {
  departments: ['name', 'code'],
  users: ['search', 'name', 'email'],
  subjects: ['name', 'code'],
  classes: ['name'],
} as const;

export const RESOURCE_FILTERS: Record<string, string[]> = {
  subjects: ['department'],
  classes: ['subject', 'teacher'],
} as const;

export const STORAGE_KEY = 'user' as const;

export const ERROR_MESSAGES = {
  REGISTER_FAILED: 'Unable to create account. Please try again.',
  LOGIN_FAILED: 'Please try again later.',
  LOGOUT_FAILED: 'Unable to log out. Please try again.',
  UNAUTHORIZED: 'Check failed',
} as const;

export const BANNER_DIMENSIONS = {
  width: 1200,
  height: 297,
} as const;

export const BANNER_TEXT_CONFIG = {
  fontFamily: 'roboto',
  fontSize: 42,
  fontWeight: 'bold',
  color: 'white',
  position: {
    gravity: 'south_west',
    offsetY: 0.2,
    offsetX: 0.02,
  },
} as const;
