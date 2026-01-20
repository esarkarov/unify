import { useDepartmentTables } from '@/features/departments/hooks/use-department-tables';
import { SearchInput } from '@/shared/components/molecules/SearchInput';
import { CreateButton } from '@/shared/components/refine-ui/buttons/create';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/shared/components/refine-ui/views/list-view';
import { useMemo, useState } from 'react';

const DepartmentsListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filters = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    return [
      {
        field: 'name',
        operator: 'contains' as const,
        value: searchQuery.trim(),
      },
      {
        field: 'code',
        operator: 'contains' as const,
        value: searchQuery.trim(),
      },
    ];
  }, [searchQuery]);

  const { departmentTable } = useDepartmentTables({
    filters,
  });

  const { isLoading, isError, error } = departmentTable.refineCore.tableQuery;

  if (isLoading) {
    return (
      <ListView>
        <Breadcrumb />
        <h1 className="page-title">Departments</h1>
        <div
          className="flex items-center justify-center p-8"
          role="status">
          <p className="text-muted-foreground">
            Loading departments...
            <span className="sr-only">Please wait</span>
          </p>
        </div>
      </ListView>
    );
  }

  if (isError) {
    return (
      <ListView>
        <Breadcrumb />
        <h1 className="page-title">Departments</h1>
        <div className="flex items-center justify-center p-8">
          <p
            className="text-destructive"
            role="alert">
            Error loading departments: {error?.message ?? 'Unknown error'}
          </p>
        </div>
      </ListView>
    );
  }

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Departments</h1>

      <div className="intro-row">
        <p className="text-muted-foreground">Quick access to essential metrics and management tools.</p>

        <div className="actions-row">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or code..."
            aria-label="Search departments by name or code"
          />

          <CreateButton resource="departments" />
        </div>
      </div>

      <DataTable table={departmentTable} />
    </ListView>
  );
};

export default DepartmentsListPage;
