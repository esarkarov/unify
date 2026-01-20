import { STATUS_VARIANTS } from '@/features/subjects/constants';
import { Badge } from '@/shared/components/ui/badge';
import { Status } from '@/shared/types';

interface StatusBadgeProps {
  status: Status | string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variant = STATUS_VARIANTS[status as Status] ?? 'secondary';
  const displayText = status || 'unknown';

  return (
    <Badge
      variant={variant}
      className={className}>
      {displayText}
    </Badge>
  );
};
