import { ChartCard } from '@/features/dashboard/components/molecules/ChartCard';
import { DashboardListItem } from '@/features/dashboard/components/molecules/DashboardListItem';
import { useLink } from '@refinedev/core';

interface NewestTeachersCardProps {
  teachers: Array<{
    id: string;
    name: string;
    email: string;
  }>;
}

export const NewestTeachersCard = ({ teachers }: NewestTeachersCardProps) => {
  const Link = useLink();
  return (
    <ChartCard title="Newest Teachers">
      <div className="space-y-3">
        {teachers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent teachers.</p>
        ) : (
          teachers.map((teacher, index) => (
            <Link
              key={teacher.id}
              to={`/faculty/show/${teacher.id}`}>
              <DashboardListItem
                index={index}
                title={teacher.name}
                subtitle={teacher.email}
                badge="New"
              />
            </Link>
          ))
        )}
      </div>
    </ChartCard>
  );
};
