import { UploadDropzone } from '@/shared/components/molecules/UploadDropzone';
import { UploadPreview } from '@/shared/components/molecules/UploadPreview';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  DEFAULT_ALLOWED_FORMATS,
  DEFAULT_MAX_FILE_SIZE,
} from '@/shared/constants';
import { useCloudinaryDelete } from '@/shared/hooks/use-cloudinary-delete';
import { useCloudinaryWidget } from '@/shared/hooks/use-cloudinary-widget';
import { CloudinaryUploadInfo } from '@/shared/types';
import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_FOLDER = 'uploads';

export interface UploadWidgetValue {
  url: string;
  publicId: string;
}

export interface UploadWidgetProps {
  value?: UploadWidgetValue | null;
  onChange?: (value: UploadWidgetValue | null) => void;
  disabled?: boolean;
  maxFileSize?: number;
  allowedFormats?: string[];
  folder?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

function UploadWidget({
  value = null,
  onChange,
  disabled = false,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  allowedFormats = DEFAULT_ALLOWED_FORMATS,
  folder = DEFAULT_FOLDER,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}: UploadWidgetProps) {
  const onChangeRef = useRef(onChange);
  const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
  const [deleteToken, setDeleteToken] = useState<string | null>(null);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setPreview(value);
    if (!value) {
      setDeleteToken(null);
    }
  }, [value]);

  const handleUploadSuccess = useCallback((info: CloudinaryUploadInfo) => {
    const payload: UploadWidgetValue = {
      url: info.secure_url,
      publicId: info.public_id,
    };

    setPreview(payload);
    setDeleteToken(info.delete_token ?? null);
    onChangeRef.current?.(payload);
  }, []);

  const { openWidget, isReady } = useCloudinaryWidget({
    cloudName: CLOUDINARY_CLOUD_NAME,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
    folder,
    maxFileSize,
    allowedFormats,
    onSuccess: handleUploadSuccess,
    onError: (error) => {
      console.error('Upload error:', error);
      // Could add toast notification here
    },
  });

  const handleDeleteSuccess = useCallback(() => {
    setPreview(null);
    setDeleteToken(null);
    onChangeRef.current?.(null);
  }, []);

  const { deleteImage, isDeleting } = useCloudinaryDelete({
    onSuccess: handleDeleteSuccess,
    onError: (error) => {
      console.error('Delete error:', error);
      // Could add toast notification here
    },
  });

  const handleRemove = useCallback(async () => {
    if (!preview) return;

    if (deleteToken) {
      await deleteImage(deleteToken);
    } else {
      handleDeleteSuccess();
    }
  }, [preview, deleteToken, deleteImage, handleDeleteSuccess]);

  const handleUpload = useCallback(() => {
    if (!disabled && isReady) {
      openWidget();
    }
  }, [disabled, isReady, openWidget]);

  const maxFileSizeMB = maxFileSize / 1_000_000;
  const formatsList = allowedFormats.map((f) => f.toUpperCase());

  return (
    <div className="space-y-2">
      {preview ? (
        <UploadPreview
          imageUrl={preview.url}
          imageAlt="Uploaded file"
          onRemove={handleRemove}
          isRemoving={isDeleting}
          disabled={disabled}
        />
      ) : (
        <UploadDropzone
          onUpload={handleUpload}
          disabled={disabled || !isReady}
          maxFileSize={maxFileSizeMB}
          allowedFormats={formatsList}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
        />
      )}
    </div>
  );
}

export default UploadWidget;
