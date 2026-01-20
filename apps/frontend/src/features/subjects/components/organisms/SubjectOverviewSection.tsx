import { InfoCard } from '@/features/subjects/components/organisms/InfoCard';
import { Badge } from '@/shared/components/ui/badge';

interface SubjectOverviewSectionProps {
  code: string;
  description?: string | null;
}

export const SubjectOverviewSection = ({ code, description }: SubjectOverviewSectionProps) => {
  return (
    <InfoCard
      title="Subject Overview"
      badge={<Badge variant="secondary">{code}</Badge>}>
      <p className="text-sm text-muted-foreground">{description || 'No description provided.'}</p>
    </InfoCard>
  );
};
