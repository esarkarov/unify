import { useLink } from '@refinedev/core';
import { useMemo } from 'react';
import { KpiCard } from '@/features/dashboard/components/atoms/KpiCard';
import { ChartCard } from '@/features/dashboard/components/molecules/ChartCard';
import { DashboardListItem } from '@/features/dashboard/components/molecules/DashboardListItem';
import { InsightBarChart } from '@/features/dashboard/components/molecules/InsightBarChart';
import { UsersByRoleChart } from '@/features/dashboard/components/molecules/UsersByRoleChart';
import { CHART_COLORS, KPI_CONFIG, ROLE_COLORS } from '@/features/dashboard/constants';
import { useDashboardData } from '@/features/dashboard/hooks/use-dashboard-data';
import {
  getNewestItems,
  getNewestTeachers,
  getTopItems,
  groupClassesBySubject,
  groupSubjectsByDepartment,
  groupUsersByRole,
} from '@/features/dashboard/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

const DashboardPage = () => {
  const Link = useLink();
  const { users, subjects, departments, classes, isLoading } = useDashboardData();

  const usersByRole = useMemo(() => groupUsersByRole(users), [users]);
  const subjectsByDepartment = useMemo(() => groupSubjectsByDepartment(subjects), [subjects]);
  const classesBySubject = useMemo(() => groupClassesBySubject(classes), [classes]);
  const newestClasses = useMemo(() => getNewestItems(classes, 5), [classes]);
  const newestTeachers = useMemo(() => getNewestTeachers(users, 5), [users]);
  const topDepartments = useMemo(() => getTopItems(subjectsByDepartment, 'totalSubjects', 5), [subjectsByDepartment]);
  const topSubjects = useMemo(() => getTopItems(classesBySubject, 'totalClasses', 5), [classesBySubject]);

  const kpiValues = useMemo(
    () => ({
      totalUsers: users.length,
      teachers: users.filter((u) => u.role === 'teacher').length,
      admins: users.filter((u) => u.role === 'admin').length,
      subjects: subjects.length,
      departments: departments.length,
      classes: classes.length,
    }),
    [users, subjects, departments, classes]
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Dashboard</h1>
        <p className="text-muted-foreground">A quick snapshot of the latest activity and key metrics.</p>
      </header>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {KPI_CONFIG.map((kpi) => (
              <KpiCard
                key={kpi.key}
                label={kpi.label}
                value={kpiValues[kpi.key]}
                icon={kpi.icon}
                accentColor={kpi.accent}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          title="Users by Role"
          className="lg:col-span-2">
          <div className="space-y-4">
            <UsersByRoleChart
              data={usersByRole}
              colors={[...ROLE_COLORS]}
            />
          </div>
        </ChartCard>

        <div className="grid gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>New Classes (last 5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{newestClasses.length}</div>
              <p className="text-sm text-muted-foreground">Most recent classes added</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>New Teachers (last 5)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{newestTeachers.length}</div>
              <p className="text-sm text-muted-foreground">Most recent teachers added</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChartCard title="Insights">
        <div className="grid gap-6 lg:grid-cols-2">
          <InsightBarChart
            title="Subjects per Department"
            data={subjectsByDepartment}
            dataKey="totalSubjects"
            xAxisKey="departmentName"
            barColor={CHART_COLORS.SUBJECTS_BY_DEPT}
          />
          <InsightBarChart
            title="Classes per Subject"
            data={classesBySubject}
            dataKey="totalClasses"
            xAxisKey="subjectName"
            barColor={CHART_COLORS.CLASSES_BY_SUBJECT}
          />
        </div>
      </ChartCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Newest Classes">
          <div className="space-y-3">
            {newestClasses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent classes.</p>
            ) : (
              newestClasses.map((item, index) => (
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

        <ChartCard title="Newest Teachers">
          <div className="space-y-3">
            {newestTeachers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent teachers.</p>
            ) : (
              newestTeachers.map((teacher, index) => (
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
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Departments with Most Subjects">
          <div className="space-y-3">
            {topDepartments.map((dept, index) => (
              <DashboardListItem
                key={`${dept.departmentName}-${index}`}
                index={index}
                title={dept.departmentName}
                subtitle={`${dept.totalSubjects} subjects`}
                badge={dept.totalSubjects}
              />
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Subjects with Most Classes">
          <div className="space-y-3">
            {topSubjects.map((subject, index) => (
              <DashboardListItem
                key={`${subject.subjectName}-${index}`}
                index={index}
                title={subject.subjectName}
                subtitle={`${subject.totalClasses} classes`}
                badge={subject.totalClasses}
              />
            ))}
          </div>
        </ChartCard>
      </div>

      <Separator />
    </div>
  );
};

export default DashboardPage;
