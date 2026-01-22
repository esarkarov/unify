import { useFacultyTables } from '@/features/faculty/hooks/use-faculty-tables';
import { SearchInput } from '@/shared/components/molecules/SearchInput';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/shared/components/refine-ui/views/list-view';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

const FacultyListPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');

  const filters = searchQuery
    ? [
        {
          field: 'search',
          operator: 'contains' as const,
          value: searchQuery,
        },
      ]
    : [];

  const { facultyTable } = useFacultyTables({ filters });
  const { isLoading, isError, error } = facultyTable.refineCore.tableQuery;

  if (isLoading) {
    return (
      <ListView>
        <Breadcrumb />
        <h1 className="page-title">Faculty</h1>
        <div
          className="flex items-center justify-center p-8"
          role="status">
          <p className="text-muted-foreground">
            Loading members...<span className="sr-only">Please wait</span>
          </p>
        </div>
      </ListView>
    );
  }

  if (isError) {
    return (
      <ListView>
        <Breadcrumb />
        <h1 className="page-title">Faculty</h1>
        <div className="flex items-center justify-center p-8">
          <p
            className="text-destructive"
            role="alert">
            Error loading members: {error?.message ?? 'Unknown error'}
          </p>
        </div>
      </ListView>
    );
  }

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Faculty</h1>

      <div className="intro-row">
        <p>Browse and manage faculty members.</p>

        <div className="actions-row">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or email..."
          />
        </div>
      </div>

      <DataTable table={facultyTable} />
    </ListView>
  );
};

export default FacultyListPage;
