import { DepartmentSection } from '@/features/subjects/components/organisms/DepartmentSection';
import { SubjectOverviewSection } from '@/features/subjects/components/organisms/SubjectOverviewSection';
import { useSubjectTables } from '@/features/subjects/hooks/use-subject-tables';
import { SubjectDetails } from '@/features/subjects/types';
import { LoadingErrorState } from '@/shared/components/molecules/LoadingErrorState';
import { DataTableSection } from '@/shared/components/organisms/DataTableSection';
import { ShowView, ShowViewHeader } from '@/shared/components/refine-ui/views/show-view';
import { useShow } from '@refinedev/core';
import { useParams } from 'react-router';

const SubjectDetailsPage = () => {
  const { id } = useParams();

  const {
    query: { data, isLoading, isError },
  } = useShow<SubjectDetails>({
    resource: 'subjects',
    id,
  });

  const { classesTable, teachersTable, studentsTable } = useSubjectTables({
    subjectId: id,
  });

  const details = data?.data;

  if (isLoading || isError || !details) {
    return (
      <ShowView className="class-view">
        <ShowViewHeader
          resource="subjects"
          title="Subject Details"
        />
        <LoadingErrorState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!details}
          loadingText="Loading subject details..."
          errorText="Failed to load subject details."
          emptyText="Subject details not found."
        />
      </ShowView>
    );
  }

  const { subject, totals } = details;

  return (
    <ShowView className="class-view space-y-6">
      <ShowViewHeader
        resource="subjects"
        title={subject.name}
      />
      <SubjectOverviewSection
        code={subject.code}
        description={subject.description}
      />
      <DepartmentSection department={subject.department} />
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

export default SubjectDetailsPage;
