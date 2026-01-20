import { ALL_DEPARTMENTS, DEPARTMENT_OPTIONS } from '@/features/subjects/constants';
import { useSubjectTables } from '@/features/subjects/hooks/use-subject-tables';
import { CreateButton } from '@/shared/components/refine-ui/buttons/create';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/shared/components/refine-ui/views/list-view';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

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

  const { subjectsTable } = useSubjectTables({
    filters,
  });

  const { isLoading, isError, error } = subjectsTable.refineCore.tableQuery;

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

      <DataTable table={subjectsTable} />
    </ListView>
  );
};

export default SubjectsListPage;
