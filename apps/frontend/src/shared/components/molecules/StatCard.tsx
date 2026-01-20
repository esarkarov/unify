import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  className?: string;
}

export const StatCard = ({ label, value, icon: Icon, className = '' }: StatCardProps) => {
  return (
    <div className={`rounded-lg border border-border bg-muted/20 p-4 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span>{label}</span>
        <Icon
          className="h-4 w-4"
          aria-hidden="true"
        />
      </div>
      <div
        className="mt-2 text-2xl font-semibold"
        aria-label={`${label}: ${value}`}>
        {value}
      </div>
    </div>
  );
};
