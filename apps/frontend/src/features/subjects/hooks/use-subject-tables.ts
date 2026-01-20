import { classTableColumns, subjectTableColumns, userTableColumns } from '@/features/subjects/config';
import { Filter, Subject, SubjectClass, SubjectUser } from '@/features/subjects/types';
import { PAGE_SIZE } from '@/shared/constants';
import { useTable } from '@refinedev/react-table';
import { useMemo } from 'react';

interface UseSubjectTablesParams {
  subjectId?: string;
  pageSize?: number;
  filters?: Filter[];
}

export const useSubjectTables = ({ subjectId, pageSize = PAGE_SIZE, filters }: UseSubjectTablesParams) => {
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
      resource: `subjects/${subjectId}/classes`,
      pagination: {
        pageSize,
        mode: 'server',
      },
    },
  });
  const teachersTable = useTable<SubjectUser>({
    columns: userColumns,
    refineCoreProps: {
      resource: `subjects/${subjectId}/users`,
      pagination: {
        pageSize,
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
      resource: `subjects/${subjectId}/users`,
      pagination: {
        pageSize,
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
