import { ClassListFilters } from '@/features/classes/components/organisms/ClassListFilters';
import { ALL_VALUE, SUBJECTS_PAGE_SIZE, TEACHERS_PAGE_SIZE } from '@/features/classes/constants';
import { Subject } from '@/features/subjects/types';
import { DataTable } from '@/shared/components/refine-ui/data-table/data-table';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { ListView } from '@/shared/components/refine-ui/views/list-view';
import { User } from '@/shared/types';
import { useList } from '@refinedev/core';
import { useMemo, useState } from 'react';
import { useClassTables } from '../hooks/use-class-tables';

const ClassesListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>(ALL_VALUE);
  const [selectedTeacher, setSelectedTeacher] = useState<string>(ALL_VALUE);

  const { query: subjectsQuery } = useList<Subject>({
    resource: 'subjects',
    pagination: {
      pageSize: SUBJECTS_PAGE_SIZE,
    },
  });
  const { query: teachersQuery } = useList<User>({
    resource: 'users',
    filters: [
      {
        field: 'role',
        operator: 'eq',
        value: 'teacher',
      },
    ],
    pagination: {
      pageSize: TEACHERS_PAGE_SIZE,
    },
  });

  const subjects = subjectsQuery.data?.data || [];
  const teachers = teachersQuery.data?.data || [];

  const filters = useMemo(() => {
    const filterList = [];

    if (!searchQuery.trim()) {
      return [];
    }

    if (selectedSubject !== ALL_VALUE) {
      filterList.push({
        field: 'subject',
        operator: 'eq' as const,
        value: selectedSubject,
      });
    }

    if (selectedTeacher !== ALL_VALUE) {
      filterList.push({
        field: 'teacher',
        operator: 'eq' as const,
        value: selectedTeacher,
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
  }, [selectedSubject, selectedTeacher, searchQuery]);

  const { classesTable } = useClassTables({
    filters,
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Classes</h1>

      <div className="intro-row">
        <p className="text-muted-foreground">Quick access to essential metrics and management tools.</p>

        <ClassListFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          selectedTeacher={selectedTeacher}
          onTeacherChange={setSelectedTeacher}
          subjects={subjects}
          teachers={teachers}
        />
      </div>

      <DataTable table={classesTable} />
    </ListView>
  );
};

export default ClassesListPage;
