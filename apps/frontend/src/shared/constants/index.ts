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
