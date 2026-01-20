import { DepartmentStatsSection } from '@/features/departments/components/organisms/DepartmentStatsSection';
import { useDepartmentTables } from '@/features/departments/hooks/use-department-tables';
import { DepartmentDetails } from '@/features/departments/types';
import { LoadingErrorState } from '@/shared/components/molecules/LoadingErrorState';
import { DataTableSection } from '@/shared/components/organisms/DataTableSection';
import { ShowView, ShowViewHeader } from '@/shared/components/refine-ui/views/show-view';
import { useShow } from '@refinedev/core';
import { useParams } from 'react-router';

const DepartmentDetailsPage = () => {
  const { id } = useParams();

  const {
    query: { data, isError, isLoading },
  } = useShow<DepartmentDetails>({
    resource: 'departments',
    id,
  });

  const { subjectsTable, classesTable, teachersTable, studentsTable } = useDepartmentTables({
    departmentId: id!,
  });

  const details = data?.data;

  if (isLoading || isError || !details) {
    return (
      <ShowView className="class-view">
        <ShowViewHeader
          resource="departments"
          title="Department Details"
        />
        <LoadingErrorState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!details}
          loadingText="Loading department details..."
          errorText="Failed to load department details."
          emptyText="Department details not found."
        />
      </ShowView>
    );
  }

  const { department, totals } = details;

  return (
    <ShowView className="class-view space-y-6">
      <ShowViewHeader
        resource="departments"
        title={department.name}
      />
      <DepartmentStatsSection
        description={department.description}
        totalSubjects={totals.subjects}
        totalClasses={totals.classes}
        enrolledStudents={totals.enrolledStudents}
      />
      <DataTableSection
        title="Subjects"
        table={subjectsTable}
        count={totals.subjects}
      />
      <DataTableSection
        title="Classes"
        table={classesTable}
        count={totals.classes}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <DataTableSection
          title="Teachers"
          table={teachersTable}
        />
        <DataTableSection
          title="Students"
          table={studentsTable}
        />
      </div>
    </ShowView>
  );
};

export default DepartmentDetailsPage;
