import { ChartCard } from '@/features/dashboard/components/molecules/ChartCard';
import { DashboardListItem } from '@/features/dashboard/components/molecules/DashboardListItem';

interface TopSubjectsCardProps {
  subjects: Array<{
    subjectName: string;
    totalClasses: number;
  }>;
}

export const TopSubjectsCard = ({ subjects }: TopSubjectsCardProps) => (
  <ChartCard title="Subjects with Most Classes">
    <div className="space-y-3">
      {subjects.length === 0 ? (
        <p className="text-sm text-muted-foreground">No subjects found.</p>
      ) : (
        subjects.map((subject, index) => (
          <DashboardListItem
            key={`${subject.subjectName}-${index}`}
            index={index}
            title={subject.subjectName}
            subtitle={`${subject.totalClasses} classes`}
            badge={subject.totalClasses}
          />
        ))
      )}
    </div>
  </ChartCard>
);
