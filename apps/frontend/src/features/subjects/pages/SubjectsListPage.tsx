import { ALL_DEPARTMENTS, DEPARTMENT_OPTIONS } from '@/features/subjects/constants';
import type { Subject } from '@/features/subjects/types';
import { CreateButton } from '@/shared/components/refine-ui/buttons/create';
import { ShowButton } from '@/shared/components/refine-ui/buttons/show';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/shared/components/refine-ui/views/list-view';
import { Badge } from '@/shared/components/ui/badge';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { PAGE_SIZE } from '@/shared/constants';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const tableColumns: ColumnDef<Subject>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    size: 100,
    header: () => <span className="column-title ml-2">Code</span>,
    cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 200,
    header: () => <span className="column-title">Name</span>,
    cell: ({ getValue }) => <span className="text-foreground font-medium">{getValue<string>()}</span>,
    filterFn: 'includesString',
  },
  {
    id: 'department',
    accessorKey: 'department.name',
    size: 150,
    header: () => <span className="column-title">Department</span>,
    cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
  },
  {
    id: 'description',
    accessorKey: 'description',
    size: 300,
    header: () => <span className="column-title">Description</span>,
    cell: ({ getValue }) => <span className="line-clamp-2 text-sm text-muted-foreground">{getValue<string>()}</span>,
  },
  {
    id: 'actions',
    size: 150,
    header: () => <span className="column-title">Actions</span>,
    cell: ({ row }) => (
      <ShowButton
        resource="subjects"
        recordItemId={row.original.id}
        variant="outline"
        size="sm">
        View
      </ShowButton>
    ),
  },
];

const SubjectsListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>(ALL_DEPARTMENTS);

  const filters = useMemo(() => {
    const filterList = [];

    if (selectedDepartment !== ALL_DEPARTMENTS) {
      filterList.push({
        field: 'department',
        operator: 'eq' as const,
        value: selectedDepartment,
      });
    }

    if (searchQuery.trim()) {
      filterList.push({
        field: 'name',
        operator: 'contains' as const,
        value: searchQuery.trim(),
      });
    }

    return filterList;
  }, [selectedDepartment, searchQuery]);

  const table = useTable<Subject>({
    columns: tableColumns,
    refineCoreProps: {
      resource: 'subjects',
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
        <h1 className="page-title">Subjects</h1>
        <div
          className="flex items-center justify-center p-8"
          role="status">
          <p className="text-muted-foreground">
            Loading subjects...<span className="sr-only">Please wait</span>
          </p>
        </div>
      </ListView>
    );
  }

  if (isError) {
    return (
      <ListView>
        <Breadcrumb />
        <h1 className="page-title">Subjects</h1>
        <div className="flex items-center justify-center p-8">
          <p
            className="text-destructive"
            role="alert">
            Error loading subjects: {error?.message ?? 'Unknown error'}
          </p>
        </div>
      </ListView>
    );
  }

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Subjects</h1>

      <div className="intro-row">
        <p className="text-muted-foreground">Quick access to essential metrics and management tools.</p>

        <div className="actions-row">
          <div className="search-field">
            <Search
              className="search-icon"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search by name or code..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              aria-label="Search subjects by name or code"
            />
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}>
              <SelectTrigger aria-label="Filter by department">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={ALL_DEPARTMENTS}>All Departments</SelectItem>
                {DEPARTMENT_OPTIONS.map((department) => (
                  <SelectItem
                    key={department.value}
                    value={department.value}>
                    {department.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton resource="subjects" />
          </div>
        </div>
      </div>

      <DataTable table={table} />
    </ListView>
  );
};

export default SubjectsListPage;
