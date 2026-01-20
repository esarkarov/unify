import { AlertCircle, Loader2 } from 'lucide-react';

interface LoadingErrorStateProps {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
  className?: string;
}

export const LoadingErrorState = ({
  isLoading = false,
  isError = false,
  isEmpty = false,
  loadingText = 'Loading...',
  errorText = 'Failed to load data.',
  emptyText = 'No data available.',
  className = '',
}: LoadingErrorStateProps) => {
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center gap-2 p-8 ${className}`}
        role="status">
        <Loader2
          className="size-5 animate-spin text-muted-foreground"
          aria-hidden="true"
        />
        <p className="text-sm text-muted-foreground">
          {loadingText}
          <span className="sr-only">Please wait</span>
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`flex items-center justify-center gap-2 p-8 ${className}`}
        role="alert">
        <AlertCircle
          className="size-5 text-destructive"
          aria-hidden="true"
        />
        <p className="text-sm text-destructive">{errorText}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      </div>
    );
  }

  return null;
};
