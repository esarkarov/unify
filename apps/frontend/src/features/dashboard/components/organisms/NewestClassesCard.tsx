import { ChartCard } from '@/features/dashboard/components/molecules/ChartCard';
import { DashboardListItem } from '@/features/dashboard/components/molecules/DashboardListItem';
import { useLink } from '@refinedev/core';

interface NewestClassesCardProps {
  classes: Array<{
    id: number;
    name: string;
    subject: { name: string } | null;
    teacher: { name: string } | null;
  }>;
}

export const NewestClassesCard = ({ classes }: NewestClassesCardProps) => {
  const Link = useLink();

  return (
    <ChartCard title="Newest Classes">
      <div className="space-y-3">
        {classes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent classes.</p>
        ) : (
          classes.map((item, index) => (
            <Link
              key={item.id}
              to={`/classes/show/${item.id}`}>
              <DashboardListItem
                index={index}
                title={item.name}
                subtitle={`${item.subject?.name ?? 'No subject'} · ${item.teacher?.name ?? 'No teacher'}`}
                badge="New"
              />
            </Link>
          ))
        )}
      </div>
    </ChartCard>
  );
};
