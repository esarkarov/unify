export function PageLoader() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      role="status"
      aria-live="polite">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      <span className="sr-only">Loading page...</span>
    </div>
  );
}
