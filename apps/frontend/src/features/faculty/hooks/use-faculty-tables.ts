import { departmentTableColumns, facultyTableColumns, subjectTableColumns } from '@/features/faculty/config';
import { FacultyDepartment, FacultySubject } from '@/features/faculty/types';
import { PAGE_SIZE } from '@/shared/constants';
import { Filter, User } from '@/shared/types';
import { useTable } from '@refinedev/react-table';
import { useMemo } from 'react';

interface UseFacultyTablesParams {
  id?: string;
  filters?: Filter[];
}

export const useFacultyTables = ({ id, filters = [] }: UseFacultyTablesParams) => {
  const subjectColumns = useMemo(() => subjectTableColumns(), []);
  const departmentColumns = useMemo(() => departmentTableColumns(), []);
  const facultyColumns = useMemo(() => facultyTableColumns(), []);

  const facultyTable = useTable<User>({
    columns: facultyColumns,
    refineCoreProps: {
      resource: 'users',
      pagination: {
        pageSize: PAGE_SIZE,
        mode: 'server',
      },
      filters: {
        permanent: [
          {
            field: 'role',
            operator: 'eq' as const,
            value: 'teacher',
          },
          ...filters,
        ],
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
  const departmentsTable = useTable<FacultyDepartment>({
    columns: departmentColumns,
    refineCoreProps: {
      resource: `users/${id}/departments`,
      pagination: {
        pageSize: PAGE_SIZE,
        mode: 'server',
      },
      queryOptions: {
        enabled: !!id,
      },
    },
  });
  const subjectsTable = useTable<FacultySubject>({
    columns: subjectColumns,
    refineCoreProps: {
      resource: `users/${id}/subjects`,
      pagination: {
        pageSize: PAGE_SIZE,
        mode: 'server',
      },
      queryOptions: {
        enabled: !!id,
      },
    },
  });

  return {
    subjectsTable,
    departmentsTable,
    facultyTable,
  };
};
