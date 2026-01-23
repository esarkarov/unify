import { Badge } from '@/shared/components/ui/badge';

interface DashboardListItemProps {
  index: number;
  title: string;
  subtitle: string;
  badge?: string | number;
  to?: string;
  onClick?: () => void;
}

export const DashboardListItem = ({ index, title, subtitle, badge, to, onClick }: DashboardListItemProps) => {
  const className =
    'flex items-center justify-between rounded-md border border-transparent px-3 py-2 transition-colors hover:border-primary/30 hover:bg-muted/40';

  const content = (
    <>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-muted-foreground">#{index + 1}</span>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {badge !== undefined && <Badge variant="secondary">{badge}</Badge>}
    </>
  );

  if (to) {
    return (
      <a
        href={to}
        className={className}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} w-full text-left`}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
};
