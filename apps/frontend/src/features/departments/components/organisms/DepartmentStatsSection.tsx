import { StatCard } from '@/shared/components/molecules/StatCard';
import { InfoCard } from '@/shared/components/organisms/InfoCard';
import { BookOpen, Layers, Users } from 'lucide-react';

interface DepartmentStatsSectionProps {
  description?: string | null;
  totalSubjects: number;
  totalClasses: number;
  enrolledStudents: number;
}

export const DepartmentStatsSection = ({
  description,
  totalSubjects,
  totalClasses,
  enrolledStudents,
}: DepartmentStatsSectionProps) => {
  return (
    <InfoCard title="Overview">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{description || 'No description provided.'}</p>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Subjects"
            value={totalSubjects}
            icon={BookOpen}
          />
          <StatCard
            label="Total Classes"
            value={totalClasses}
            icon={Layers}
          />
          <StatCard
            label="Enrolled Students"
            value={enrolledStudents}
            icon={Users}
          />
        </div>
      </div>
    </InfoCard>
  );
};
