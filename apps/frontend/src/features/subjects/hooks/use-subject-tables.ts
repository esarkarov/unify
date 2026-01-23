import { classTableColumns, subjectTableColumns, userTableColumns } from '@/features/subjects/config';
import { Subject, SubjectClass, SubjectUser } from '@/features/subjects/types';
import { PAGE_SIZE } from '@/shared/constants';
import { Filter } from '@/shared/types';
import { useTable } from '@refinedev/react-table';
import { useMemo } from 'react';

interface UseSubjectTablesParams {
  id?: string;
  filters?: Filter[];
}

export const useSubjectTables = ({ id, filters }: UseSubjectTablesParams) => {
  const classColumns = useMemo(() => classTableColumns(), []);
  const userColumns = useMemo(() => userTableColumns(), []);
  const subjectColumns = useMemo(() => subjectTableColumns(), []);

  const subjectsTable = useTable<Subject>({
    columns: subjectColumns,
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
  const classesTable = useTable<SubjectClass>({
    columns: classColumns,
    refineCoreProps: {
      resource: `subjects/${id}/classes`,
      pagination: {
        pageSize: PAGE_SIZE,
        mode: 'server',
      },
    },
  });
  const teachersTable = useTable<SubjectUser>({
    columns: userColumns,
    refineCoreProps: {
      resource: `subjects/${id}/users`,
      pagination: {
        pageSize: PAGE_SIZE,
        mode: 'server',
      },
      filters: {
        permanent: [
          {
            field: 'role',
            operator: 'eq',
            value: 'teacher',
          },
        ],
      },
    },
  });
  const studentsTable = useTable<SubjectUser>({
    columns: userColumns,
    refineCoreProps: {
      resource: `subjects/${id}/users`,
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
    teachersTable,
    studentsTable,
    subjectsTable,
  };
};
