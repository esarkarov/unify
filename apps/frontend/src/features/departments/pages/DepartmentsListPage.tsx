import type { DepartmentListItem } from '@/features/departments/types';
import { SearchInput } from '@/shared/components/molecules/SearchInput';
import { CreateButton } from '@/shared/components/refine-ui/buttons/create';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/shared/components/refine-ui/views/list-view';
import { useTable } from '@refinedev/react-table';
import { useMemo, useState } from 'react';
import { ShowButton } from '@/shared/components/refine-ui/buttons/show';
import { Badge } from '@/shared/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { PAGE_SIZE } from '@/shared/constants';

const tableColumns: ColumnDef<DepartmentListItem>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    size: 100,
    header: () => <span className="column-title ml-2">Code</span>,
    cell: ({ getValue }) => {
      const code = getValue<string>();
      return code ? <Badge>{code}</Badge> : <span className="ml-2 text-muted-foreground">No code</span>;
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 200,
    header: () => <span className="column-title">Name</span>,
    cell: ({ getValue }) => <span className="font-medium text-foreground">{getValue<string>()}</span>,
    filterFn: 'includesString',
  },
  {
    id: 'totalSubjects',
    accessorKey: 'totalSubjects',
    size: 160,
    header: () => <span className="column-title">Subjects</span>,
    cell: ({ getValue }) => {
      const total = getValue<number>();
      return (
        <Badge
          variant="secondary"
          aria-label={`${total ?? 0} subjects`}>
          {total ?? 0}
        </Badge>
      );
    },
  },
  {
    id: 'description',
    accessorKey: 'description',
    size: 300,
    header: () => <span className="column-title">Description</span>,
    cell: ({ getValue }) => {
      const description = getValue<string>();
      return description ? (
        <span className="line-clamp-2 text-sm text-muted-foreground">{description}</span>
      ) : (
        <span className="text-sm text-muted-foreground">No description</span>
      );
    },
  },
  {
    id: 'actions',
    size: 150,
    header: () => <span className="column-title">Actions</span>,
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
];

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

  const table = useTable<DepartmentListItem>({
    columns: tableColumns,
    refineCoreProps: {
      resource: 'departments',
      pagination: {
        pageSize: PAGE_SIZE,
        mode: 'server',
      },
      filters: {
        permanent: filters,
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

  const { isLoading, isError, error } = table.refineCore.tableQuery;

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

      <DataTable table={table} />
    </ListView>
  );
};

export default DepartmentsListPage;
