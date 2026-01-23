import { ChartCard } from '@/features/dashboard/components/molecules/ChartCard';
import { InsightBarChart } from '@/features/dashboard/components/molecules/InsightBarChart';
import { CHART_COLORS } from '@/features/dashboard/constants';
import { ClassesBySubject, SubjectsByDepartment } from '@/features/dashboard/types';

interface InsightsSectionProps {
  charts: {
    subjectsByDepartment: SubjectsByDepartment[];
    classesBySubject: ClassesBySubject[];
  };
}

export const InsightsSection = ({ charts }: InsightsSectionProps) => (
  <ChartCard title="Insights">
    <div className="grid gap-6 lg:grid-cols-2">
      <InsightBarChart
        title="Subjects per Department"
        data={charts.subjectsByDepartment}
        dataKey="totalSubjects"
        xAxisKey="departmentName"
        barColor={CHART_COLORS.SUBJECTS_BY_DEPT}
      />
      <InsightBarChart
        title="Classes per Subject"
        data={charts.classesBySubject}
        dataKey="totalClasses"
        xAxisKey="subjectName"
        barColor={CHART_COLORS.CLASSES_BY_SUBJECT}
      />
    </div>
  </ChartCard>
);
