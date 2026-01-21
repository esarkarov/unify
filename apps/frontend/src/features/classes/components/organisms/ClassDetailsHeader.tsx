import { StatusBadge } from '@/shared/components/atoms/StatusBadge';
import { Badge } from '@/shared/components/ui/badge';

interface ClassDetailsHeaderProps {
  name: string;
  description: string;
  capacity: number;
  status: 'active' | 'inactive';
}

export const ClassDetailsHeader = ({ name, description, capacity, status }: ClassDetailsHeaderProps) => {
  return (
    <div className="details-header flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1 space-y-2">
        <h1 className="text-2xl font-bold text-foreground">{name}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Badge
          variant="outline"
          aria-label={`Capacity: ${capacity} spots`}>
          {capacity} spots
        </Badge>
        <StatusBadge status={status} />
      </div>
    </div>
  );
};
