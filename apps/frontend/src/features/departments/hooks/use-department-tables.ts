import {
  classTableColumns,
  departmentTableColumns,
  subjectTableColumns,
  userTableColumns,
} from '@/features/departments/config';
import { DepartmentClass, DepartmentListItem, DepartmentSubject, DepartmentUser } from '@/features/departments/types';
import { PAGE_SIZE } from '@/shared/constants';
import { Filter } from '@/shared/types';
import { useTable } from '@refinedev/react-table';
import { useMemo } from 'react';

interface UseDepartmentTablesParams {
  departmentId?: string;
  pageSize?: number;
  filters?: Filter[];
}

export const useDepartmentTables = ({ departmentId, pageSize = PAGE_SIZE, filters }: UseDepartmentTablesParams) => {
  const subjectColumns = useMemo(() => subjectTableColumns(), []);
  const classColumns = useMemo(() => classTableColumns(), []);
  const userColumns = useMemo(() => userTableColumns(), []);
  const departmentColumns = useMemo(() => departmentTableColumns(), []);

  const subjectsTable = useTable<DepartmentSubject>({
    columns: subjectColumns,
    refineCoreProps: {
      resource: `departments/${departmentId}/subjects`,
      pagination: {
        pageSize,
        mode: 'server',
      },
    },
  });
  const classesTable = useTable<DepartmentClass>({
    columns: classColumns,
    refineCoreProps: {
      resource: `departments/${departmentId}/classes`,
      pagination: {
        pageSize,
        mode: 'server',
      },
    },
  });
  const teachersTable = useTable<DepartmentUser>({
    columns: userColumns,
    refineCoreProps: {
      resource: `departments/${departmentId}/users`,
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
  const studentsTable = useTable<DepartmentUser>({
    columns: userColumns,
    refineCoreProps: {
      resource: `departments/${departmentId}/users`,
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
  const departmentTable = useTable<DepartmentListItem>({
    columns: departmentColumns,
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

  return {
    subjectsTable,
    classesTable,
    teachersTable,
    studentsTable,
    departmentTable,
  };
};
