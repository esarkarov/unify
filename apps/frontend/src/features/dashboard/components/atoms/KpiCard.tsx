import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  accentColor: string;
}

export const KpiCard = ({ label, value, icon: Icon, accentColor }: KpiCardProps) => {
  return (
    <div
      className="rounded-lg border border-border bg-muted/20 p-4 hover:border-primary/40 hover:bg-muted/40 transition-colors"
      role="article"
      aria-label={`${label}: ${value}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <Icon
          className={`h-4 w-4 ${accentColor}`}
          aria-hidden="true"
        />
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
};
