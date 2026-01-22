import { FacultyDepartmentsCard } from '@/features/faculty/components/organisms/FacultyDepartmentsCard';
import { FacultyProfileCard } from '@/features/faculty/components/organisms/FacultyProfileCard';
import { FacultySubjectsCard } from '@/features/faculty/components/organisms/FacultySubjectsCard';
import { useFacultyTables } from '@/features/faculty/hooks/use-faculty-tables';
import { LoadingErrorState } from '@/shared/components/molecules/LoadingErrorState';
import { ShowView, ShowViewHeader } from '@/shared/components/refine-ui/views/show-view';
import { User } from '@/shared/types';
import { useShow } from '@refinedev/core';
import { useParams } from 'react-router';

const FacultyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    query: { data, isError, isLoading },
  } = useShow<User>({
    resource: 'users',
    id,
  });

  const { subjectsTable, departmentsTable } = useFacultyTables({ id });

  const details = data?.data;

  if (isLoading || isError || !details) {
    return (
      <ShowView className="class-view">
        <ShowViewHeader
          resource="users"
          title="Faculty Details"
        />
        <LoadingErrorState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!details}
          loadingText="Loading faculty member details..."
          errorText="Failed to load faculty member details."
          emptyText="Faculty member details not found."
        />
      </ShowView>
    );
  }

  return (
    <ShowView className="class-view space-y-6">
      <ShowViewHeader
        resource="users"
        title={details.name}
      />

      <FacultyProfileCard user={details} />

      <div className="space-y-6">
        <FacultyDepartmentsCard
          userName={details.name}
          table={departmentsTable}
        />
        <FacultySubjectsCard
          userName={details.name}
          table={subjectsTable}
        />
      </div>
    </ShowView>
  );
};

export default FacultyDetailsPage;
