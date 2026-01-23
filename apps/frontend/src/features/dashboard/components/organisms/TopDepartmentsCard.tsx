import { ChartCard } from '@/features/dashboard/components/molecules/ChartCard';
import { DashboardListItem } from '@/features/dashboard/components/molecules/DashboardListItem';

interface TopDepartmentsCardProps {
  departments: Array<{
    departmentName: string;
    totalSubjects: number;
  }>;
}

export const TopDepartmentsCard = ({ departments }: TopDepartmentsCardProps) => (
  <ChartCard title="Departments with Most Subjects">
    <div className="space-y-3">
      {departments.length === 0 ? (
        <p className="text-sm text-muted-foreground">No departments found.</p>
      ) : (
        departments.map((dept, index) => (
          <DashboardListItem
            key={`${dept.departmentName}-${index}`}
            index={index}
            title={dept.departmentName}
            subtitle={`${dept.totalSubjects} subjects`}
            badge={dept.totalSubjects}
          />
        ))
      )}
    </div>
  </ChartCard>
);
