export const ErrorState = () => (
  <div className="space-y-6">
    <div>
      <h1 className="page-title">Dashboard</h1>
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">Failed to load dashboard data. Please try refreshing the page.</p>
      </div>
    </div>
  </div>
);
