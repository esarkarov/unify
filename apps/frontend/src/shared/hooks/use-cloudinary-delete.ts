import { CLOUDINARY_CLOUD_NAME } from '@/shared/constants';
import { useCallback, useState } from 'react';

interface UseCloudinaryDeleteOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/delete_by_token`;

export const useCloudinaryDelete = ({ onSuccess, onError }: UseCloudinaryDeleteOptions) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteImage = useCallback(
    async (deleteToken: string) => {
      if (!deleteToken) {
        console.warn('No delete token provided');
        return;
      }

      setIsDeleting(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append('token', deleteToken);

        const response = await fetch(API_URL, {
          method: 'POST',
          body: params,
        });

        if (!response.ok) {
          throw new Error(`Failed to delete image: ${response.statusText}`);
        }

        onSuccess?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        console.error('Failed to remove image from Cloudinary:', error);
        setError(error);
        onError?.(error);
      } finally {
        setIsDeleting(false);
      }
    },
    [onSuccess, onError]
  );

  return {
    deleteImage,
    isDeleting,
    error,
  };
};
