import { ClassDetailsCard } from '@/features/enrollments/components/organisms/ClassDetailsCard';
import { EnrollmentNotFound } from '@/features/enrollments/components/organisms/EnrollmentNotFound';
import { EnrollmentSuccessCard } from '@/features/enrollments/components/organisms/EnrollmentSuccessCard';
import { EnrollmentDetails } from '@/features/enrollments/types';
import { ShowView } from '@/shared/components/refine-ui/views/show-view';
import { useLocation, useNavigate } from 'react-router';

interface LocationState {
  enrollment?: EnrollmentDetails;
}

const EnrollmentConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const enrollment = (state as LocationState)?.enrollment;

  if (!enrollment) {
    return <EnrollmentNotFound onNavigate={() => navigate('/classes')} />;
  }

  return (
    <ShowView className="class-view space-y-6">
      <EnrollmentSuccessCard enrollment={enrollment} />
      <ClassDetailsCard
        enrollment={enrollment}
        onViewClasses={() => navigate('/classes')}
        onGoToClass={() => navigate(`/classes/show/${enrollment.class?.id}`)}
      />
    </ShowView>
  );
};

export default EnrollmentConfirmationPage;
