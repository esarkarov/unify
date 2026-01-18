import { Button } from '@/shared/components/ui/button';
import { Trash } from 'lucide-react';

interface UploadPreviewProps {
  imageUrl: string;
  imageAlt?: string;
  onRemove: () => void | Promise<void>;
  isRemoving?: boolean;
  disabled?: boolean;
}

export const UploadPreview = ({
  imageUrl,
  imageAlt = 'Uploaded file',
  onRemove,
  isRemoving = false,
  disabled = false,
}: UploadPreviewProps) => {
  return (
    <div className="upload-preview">
      <img
        src={imageUrl}
        alt={imageAlt}
        className="rounded-md object-cover"
        loading="lazy"
      />

      <Button
        type="button"
        size="icon"
        variant="destructive"
        onClick={onRemove}
        disabled={isRemoving || disabled}
        aria-label={isRemoving ? 'Removing image...' : 'Remove uploaded image'}
        title={isRemoving ? 'Removing image...' : 'Remove image'}>
        <Trash
          className="size-4"
          aria-hidden="true"
        />
        <span className="sr-only">{isRemoving ? 'Removing...' : 'Remove'}</span>
      </Button>
    </div>
  );
};
