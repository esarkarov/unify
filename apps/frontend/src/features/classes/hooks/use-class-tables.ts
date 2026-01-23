import { classTableColumns, studentTableColumns } from '@/features/classes/config';
import { ClassListItem, ClassUser } from '@/features/classes/types';
import { PAGE_SIZE } from '@/shared/constants';
import { Filter } from '@/shared/types';
import { useTable } from '@refinedev/react-table';
import { useMemo } from 'react';

interface UseClassTablesParams {
  id?: string;
  filters?: Filter[];
}

export const useClassTables = ({ id, filters }: UseClassTablesParams) => {
  const classColumns = useMemo(() => classTableColumns(), []);
  const studentColumns = useMemo(() => studentTableColumns(), []);

  const classesTable = useTable<ClassListItem>({
    columns: classColumns,
    refineCoreProps: {
      resource: 'classes',
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
  const studentsTable = useTable<ClassUser>({
    columns: studentColumns,
    refineCoreProps: {
      resource: `classes/${id}/users`,
      pagination: {
        pageSize: PAGE_SIZE,
        mode: 'server',
      },
      filters: {
        permanent: [
          {
            field: 'role',
            operator: 'eq',
            value: 'student',
          },
        ],
      },
    },
  });

  return {
    classesTable,
    studentsTable,
  };
};
