import { ClassBanner } from '@/features/classes/components/molecules/ClassBanner';
import { ClassDetailsHeader } from '@/features/classes/components/organisms/ClassDetailsHeader';
import { JoinClassSection } from '@/features/classes/components/organisms/JoinClassSection';
import { ClassDetails } from '@/features/classes/types';
import { DepartmentInfo } from '@/shared/components/molecules/DepartmentInfo';
import { InstructorInfo } from '@/shared/components/molecules/InstructorInfo';
import { LoadingErrorState } from '@/shared/components/molecules/LoadingErrorState';
import { SubjectInfo } from '@/shared/components/molecules/SubjectInfo';
import { DataTableSection } from '@/shared/components/organisms/DataTableSection';
import { ShowView, ShowViewHeader } from '@/shared/components/refine-ui/views/show-view';
import { Card } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { useShow } from '@refinedev/core';
import { useParams } from 'react-router';
import { useClassTables } from '../hooks/use-class-tables';

const ClassDetailsPage = () => {
  const { id } = useParams();

  const {
    query: { data, isError, isLoading },
  } = useShow<ClassDetails>({
    resource: 'classes',
    id,
  });

  const { studentsTable } = useClassTables({
    id,
  });

  const details = data?.data;

  if (isLoading || isError || !details) {
    return (
      <ShowView className="class-view class-show">
        <ShowViewHeader
          resource="classes"
          title="Class Details"
        />
        <LoadingErrorState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!details}
          loadingText="Loading class details..."
          errorText="Failed to load class details."
          emptyText="Class details not found."
        />
      </ShowView>
    );
  }

  const handleJoinClass = () => {
    // TODO: Implement join class logic
    console.log('Join class clicked');
  };

  return (
    <ShowView className="class-view class-show space-y-6">
      <ShowViewHeader
        resource="classes"
        title="Class Details"
      />

      <div className="banner">
        <ClassBanner
          bannerUrl={details.bannerUrl}
          bannerCldPubId={details.bannerCldPubId}
          className={details.name}
          alt={`${details.name} banner`}
        />
      </div>

      <Card className="details-card">
        <div className="space-y-6 p-6">
          <ClassDetailsHeader
            name={details.name}
            description={details.description}
            capacity={details.capacity}
            status={details.status}
          />

          <div className="details-grid grid gap-6 md:grid-cols-2">
            <InstructorInfo teacher={details.teacher} />
            <DepartmentInfo department={details.department} />
          </div>
        </div>

        <Separator />

        <div className="p-6">
          <SubjectInfo subject={details.subject} />
        </div>

        <Separator />

        <div className="p-6">
          <JoinClassSection onJoinClick={handleJoinClass} />
        </div>
      </Card>

      <DataTableSection
        title="Enrolled Students"
        table={studentsTable}
      />
    </ShowView>
  );
};

export default ClassDetailsPage;
