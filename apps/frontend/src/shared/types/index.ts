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

declare global {
  interface Window {
    cloudinary?: CloudinaryAPI;
  }
}
