import { ClassListItem } from '@/features/classes/types';
import { Department } from '@/features/departments/types';
import { Subject } from '@/features/subjects/types';
import { User } from '@/shared/types';
import { useList } from '@refinedev/core';

export function useDashboardData() {
  const { query: usersQuery } = useList<User>({
    resource: 'users',
    pagination: { mode: 'off' },
  });

  const { query: subjectsQuery } = useList<Subject>({
    resource: 'subjects',
    pagination: { mode: 'off' },
  });

  const { query: departmentsQuery } = useList<Department>({
    resource: 'departments',
    pagination: { mode: 'off' },
  });

  const { query: classesQuery } = useList<ClassListItem>({
    resource: 'classes',
    pagination: { mode: 'off' },
  });

  const users = usersQuery.data?.data ?? [];
  const subjects = subjectsQuery.data?.data ?? [];
  const departments = departmentsQuery.data?.data ?? [];
  const classes = classesQuery.data?.data ?? [];

  const isLoading =
    usersQuery.isLoading || subjectsQuery.isLoading || departmentsQuery.isLoading || classesQuery.isLoading;

  return {
    users,
    subjects,
    departments,
    classes,
    isLoading,
  };
}
