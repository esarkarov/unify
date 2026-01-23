import { ErrorState } from '@/features/dashboard/components/atoms/ErrorState';
import { LoadingState } from '@/features/dashboard/components/atoms/LoadingState';
import { ChartCard } from '@/features/dashboard/components/molecules/ChartCard';
import { UsersByRoleChart } from '@/features/dashboard/components/molecules/UsersByRoleChart';
import { InsightsSection } from '@/features/dashboard/components/organisms/InsightsSection';
import { NewestClassesCard } from '@/features/dashboard/components/organisms/NewestClassesCard';
import { NewestTeachersCard } from '@/features/dashboard/components/organisms/NewestTeachersCard';
import { OverviewSection } from '@/features/dashboard/components/organisms/OverviewSection';
import { RecentStatsCards } from '@/features/dashboard/components/organisms/RecentStatsCards';
import { TopDepartmentsCard } from '@/features/dashboard/components/organisms/TopDepartmentsCard';
import { TopSubjectsCard } from '@/features/dashboard/components/organisms/TopSubjectsCard';
import { ROLE_COLORS } from '@/features/dashboard/constants';
import { useDashboardStats } from '@/features/dashboard/hooks/use-dashboard-stats';
import { getTopItems } from '@/features/dashboard/utils';
import { Separator } from '@/shared/components/ui/separator';
import { useMemo } from 'react';

const DashboardPage = () => {
  const { overview, latest, charts, isLoading, isError } = useDashboardStats();

  const topDepartments = useMemo(
    () => getTopItems(charts.subjectsByDepartment, 'totalSubjects', 5),
    [charts.subjectsByDepartment]
  );

  const topSubjects = useMemo(() => getTopItems(charts.classesBySubject, 'totalClasses', 5), [charts.classesBySubject]);

  const kpiValues = useMemo(
    () => ({
      totalUsers: overview.users,
      teachers: overview.teachers,
      subjects: overview.subjects,
      departments: overview.departments,
      classes: overview.classes,
    }),
    [overview]
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-muted-foreground">A quick snapshot of the latest activity and key metrics.</p>
      </header>

      <OverviewSection kpiValues={kpiValues} />

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          title="Users by Role"
          className="lg:col-span-2">
          <UsersByRoleChart
            data={charts.usersByRole}
            colors={ROLE_COLORS}
          />
        </ChartCard>

        <RecentStatsCards
          classesCount={latest.latestClasses.length}
          teachersCount={latest.latestTeachers.length}
        />
      </div>

      <InsightsSection charts={charts} />

      <div className="grid gap-6 lg:grid-cols-2">
        <NewestClassesCard classes={latest.latestClasses} />
        <NewestTeachersCard teachers={latest.latestTeachers} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopDepartmentsCard departments={topDepartments} />
        <TopSubjectsCard subjects={topSubjects} />
      </div>

      <Separator />
    </div>
  );
};

export default DashboardPage;
