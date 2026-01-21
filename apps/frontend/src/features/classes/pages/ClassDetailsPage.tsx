import { ClassBanner } from '@/features/classes/components/molecules/ClassBanner';
import { ClassDetailsHeader } from '@/features/classes/components/organisms/ClassDetailsHeader';
import { JoinClassSection } from '@/features/classes/components/organisms/JoinClassSection';
import { studentTableColumns } from '@/features/classes/config';
import { ClassDetails, ClassUser } from '@/features/classes/types';
import { DepartmentInfo } from '@/shared/components/molecules/DepartmentInfo';
import { InstructorInfo } from '@/shared/components/molecules/InstructorInfo';
import { LoadingErrorState } from '@/shared/components/molecules/LoadingErrorState';
import { SubjectInfo } from '@/shared/components/molecules/SubjectInfo';
import { DataTableSection } from '@/shared/components/organisms/DataTableSection';
import { ShowView, ShowViewHeader } from '@/shared/components/refine-ui/views/show-view';
import { Card } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { PAGE_SIZE } from '@/shared/constants';
import { useShow } from '@refinedev/core';
import { useTable } from '@refinedev/react-table';
import { useMemo } from 'react';
import { useParams } from 'react-router';

const ClassDetailsPage = () => {
  const { id } = useParams();

  const { query } = useShow<ClassDetails>({
    resource: 'classes',
    id,
  });

  const studentColumns = useMemo(() => studentTableColumns(), []);

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

  const classDetails = query.data?.data;

  if (query.isLoading || query.isError || !classDetails) {
    return (
      <ShowView className="class-view class-show">
        <ShowViewHeader
          resource="classes"
          title="Class Details"
        />
        <LoadingErrorState
          isLoading={query.isLoading}
          isError={query.isError}
          isEmpty={!classDetails}
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
          bannerUrl={classDetails.bannerUrl}
          bannerCldPubId={classDetails.bannerCldPubId}
          className={classDetails.name}
          alt={`${classDetails.name} banner`}
        />
      </div>

      <Card className="details-card">
        <div className="space-y-6 p-6">
          <ClassDetailsHeader
            name={classDetails.name}
            description={classDetails.description}
            capacity={classDetails.capacity}
            status={classDetails.status}
          />

          <div className="details-grid grid gap-6 md:grid-cols-2">
            <InstructorInfo teacher={classDetails.teacher} />
            <DepartmentInfo department={classDetails.department} />
          </div>
        </div>

        <Separator />

        <div className="p-6">
          <SubjectInfo subject={classDetails.subject} />
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
