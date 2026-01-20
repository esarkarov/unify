import { UploadCloud } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface UploadDropzoneProps {
  onUpload: () => void;
  disabled?: boolean;
  maxFileSize?: number;
  allowedFormats?: string[];
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const UploadDropzone = ({
  onUpload,
  disabled = false,
  maxFileSize = 5,
  allowedFormats = ['PNG', 'JPG'],
  'aria-label': ariaLabel = 'Upload photo',
  'aria-describedby': ariaDescribedby,
}: UploadDropzoneProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled) {
        onUpload();
      }
    }
  };

  const formatsList = allowedFormats.join(', ');
  const sizeText = `up to ${maxFileSize}MB`;

  return (
    <div
      className="upload-dropzone"
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onUpload}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-disabled={disabled}
      data-disabled={disabled}>
      <div className="upload-prompt">
        <UploadCloud
          className="icon"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-medium">Click to upload photo</p>
          <p className="text-xs text-muted-foreground">
            {formatsList} {sizeText}
          </p>
        </div>
      </div>
    </div>
  );
};
