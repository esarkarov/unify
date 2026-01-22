import { useFacultyTables } from '@/features/faculty/hooks/use-faculty-tables';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface FacultySubjectsCardProps {
  userName: string;
  table: ReturnType<typeof useFacultyTables>['subjectsTable'];
}

export const FacultySubjectsCard = ({ userName, table }: FacultySubjectsCardProps) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader>
      <CardTitle>Subjects</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">Subjects associated with {userName} in this term.</p>
      <DataTable table={table} />
    </CardContent>
  </Card>
);
