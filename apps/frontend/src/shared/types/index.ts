declare global {
  interface Window {
    cloudinary?: CloudinaryAPI;
  }
}
export interface CloudinaryUploadInfo {
  secure_url: string;
  public_id: string;
  delete_token?: string;
  resource_type: string;
  original_filename: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
}

export interface CloudinaryUploadWidgetResults {
  event: 'success' | 'queues-end' | 'close' | 'display-changed' | string;
  info: CloudinaryUploadInfo | string;
}

export interface CloudinaryWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
  update: (options: Partial<CloudinaryWidgetOptions>) => void;
}

export interface CloudinaryWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  multiple: boolean;
  folder: string;
  maxFileSize: number;
  clientAllowedFormats: string[];
  sources?: string[];
  showAdvancedOptions?: boolean;
  cropping?: boolean;
  croppingAspectRatio?: number;
  theme?: 'default' | 'white' | 'minimal';
}

export interface CloudinaryAPI {
  createUploadWidget: (
    options: CloudinaryWidgetOptions,
    callback: (error: Error | null, result: CloudinaryUploadWidgetResults) => void
  ) => CloudinaryWidget;
}

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string;
  imageCldPubId?: string;
  department?: string;
}
export interface SignUpPayload {
  email: string;
  name: string;
  password: string;
  image?: string;
  imageCldPubId?: string;
  role: UserRole;
}

export interface Filter {
  field: string;
  operator: 'eq' | 'contains';
  value: string;
}

export type Schedule = {
  day: string;
  startTime: string;
  endTime: string;
};

export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled';

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  pagination?: PaginationMeta;
}

export type QueryParams = Record<string, string | number>;
