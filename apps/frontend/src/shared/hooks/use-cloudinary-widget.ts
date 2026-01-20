import { DEFAULT_ALLOWED_FORMATS, DEFAULT_MAX_FILE_SIZE } from '@/shared/constants';
import { CloudinaryUploadInfo, CloudinaryUploadWidgetResults, CloudinaryWidget } from '@/shared/types';
import { useEffect, useRef } from 'react';

interface UseCloudinaryWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
  maxFileSize?: number;
  allowedFormats?: string[];
  onSuccess?: (info: CloudinaryUploadInfo) => void;
  onError?: (error: Error) => void;
}

const POLLING_INTERVAL = 500;

export const useCloudinaryWidget = ({
  cloudName,
  uploadPreset,
  folder = 'uploads',
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  allowedFormats = DEFAULT_ALLOWED_FORMATS,
  onSuccess,
  onError,
}: UseCloudinaryWidgetOptions) => {
  const widgetRef = useRef<CloudinaryWidget | null>(null);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [onSuccess, onError]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeWidget = (): boolean => {
      if (widgetRef.current) return true;

      if (!window.cloudinary) return false;

      try {
        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName,
            uploadPreset,
            multiple: false,
            folder,
            maxFileSize,
            clientAllowedFormats: allowedFormats,
            sources: ['local', 'camera'],
            showAdvancedOptions: false,
            cropping: false,
          },
          (error, result: CloudinaryUploadWidgetResults) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              onErrorRef.current?.(error as Error);
              return;
            }

            if (result.event === 'success') {
              const info = result.info as CloudinaryUploadInfo;
              onSuccessRef.current?.(info);
            }
          }
        );

        return true;
      } catch (error) {
        console.error('Failed to initialize Cloudinary widget:', error);
        onErrorRef.current?.(error as Error);
        return false;
      }
    };

    if (initializeWidget()) return;

    const intervalId = window.setInterval(() => {
      if (initializeWidget()) {
        window.clearInterval(intervalId);
      }
    }, POLLING_INTERVAL);

    return () => {
      window.clearInterval(intervalId);

      if (widgetRef.current) {
        try {
          widgetRef.current.destroy();
        } catch (error) {
          console.warn('Error destroying Cloudinary widget:', error);
        }
        widgetRef.current = null;
      }
    };
  }, [cloudName, uploadPreset, folder, maxFileSize, allowedFormats]);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      console.warn('Cloudinary widget not initialized');
    }
  };

  return {
    openWidget,
    isReady: !!widgetRef.current,
  };
};
