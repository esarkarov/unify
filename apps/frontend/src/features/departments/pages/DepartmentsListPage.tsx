import { DepartmentListItem } from '@/features/departments/types';
import { CreateButton } from '@/shared/components/refine-ui/buttons/create';
import { ShowButton } from '@/shared/components/refine-ui/buttons/show';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/shared/components/refine-ui/views/list-view';
import { Badge } from '@/shared/components/ui/badge';
import { Input } from '@/shared/components/ui/input';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const DepartmentsListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const departmentColumns = useMemo<ColumnDef<DepartmentListItem>[]>(
    () => [
      {
        id: 'code',
        accessorKey: 'code',
        size: 100,
        header: () => <p className="column-title ml-2">Code</p>,
        cell: ({ getValue }) => {
          const code = getValue<string>();

          return code ? <Badge>{code}</Badge> : <span className="text-muted-foreground ml-2">No code</span>;
        },
      },
      {
        id: 'name',
        accessorKey: 'name',
        size: 200,
        header: () => <p className="column-title">Name</p>,
        cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
        filterFn: 'includesString',
      },
      {
        id: 'totalSubjects',
        accessorKey: 'totalSubjects',
        size: 160,
        header: () => <p className="column-title">Subjects</p>,
        cell: ({ getValue }) => {
          const total = getValue<number>();
          return <Badge variant="secondary">{total ?? 0}</Badge>;
        },
      },
      {
        id: 'description',
        accessorKey: 'description',
        size: 300,
        header: () => <p className="column-title">Description</p>,
        cell: ({ getValue }) => {
          const description = getValue<string>();

          return description ? (
            <span className="truncate line-clamp-2">{description}</span>
          ) : (
            <span className="text-muted-foreground">No description</span>
          );
        },
      },
      {
        id: 'actions',
        size: 150,
        header: () => <p className="column-title">Actions</p>,
        cell: ({ row }) => (
          <ShowButton
            resource="departments"
            recordItemId={row.original.id}
            variant="outline"
            size="sm">
            View
          </ShowButton>
        ),
      },
    ],
    []
  );

  const searchFilters = searchQuery
    ? [
        {
          field: 'name',
          operator: 'contains' as const,
          value: searchQuery,
        },
        {
          field: 'code',
          operator: 'contains' as const,
          value: searchQuery,
        },
      ]
    : [];

  const departmentsTable = useTable<DepartmentListItem>({
    columns: departmentColumns,
    refineCoreProps: {
      resource: 'departments',
      pagination: {
        pageSize: 10,
        mode: 'server',
      },
      filters: {
        permanent: [...searchFilters],
      },
      sorters: {
        initial: [
          {
            field: 'id',
            order: 'desc',
          },
        ],
      },
    },
  });

  const { isLoading, isError, error } = departmentsTable.refineCore.tableQuery;

  if (isLoading) {
    return (
      <ListView>
        <Breadcrumb />
        <h1 className="page-title">Departments</h1>
        <div className="flex items-center justify-center p-8">
          <p>Loading departments...</p>
        </div>
      </ListView>
    );
  }

  if (isError) {
    return (
      <ListView>
        <Breadcrumb />
        <h1 className="page-title">Departments</h1>
        <div className="flex items-center justify-center p-8 text-red-500">
          <p>Error loading departments: {error?.message}</p>
        </div>
      </ListView>
    );
  }

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Departments</h1>

      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>

        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <Input
              type="text"
              placeholder="Search by name or code..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <CreateButton resource="departments" />
        </div>
      </div>

      <DataTable table={departmentsTable} />
    </ListView>
  );
};

export default DepartmentsListPage;
