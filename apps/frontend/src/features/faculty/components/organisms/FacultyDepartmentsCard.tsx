import { useFacultyTables } from '@/features/faculty/hooks/use-faculty-tables';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface FacultyDepartmentsCardProps {
  userName: string;
  table: ReturnType<typeof useFacultyTables>['departmentsTable'];
}

export const FacultyDepartmentsCard = ({ userName, table }: FacultyDepartmentsCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader>
      <CardTitle>Departments</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">Departments tied to {userName} based on classes and enrollments.</p>
      <DataTable table={table} />
    </CardContent>
  </Card>
);
