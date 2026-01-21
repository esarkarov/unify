import { JoinClassForm } from '@/features/enrollments/components/organisms/JoinClassForm';
import { EnrollmentJoinFormValues, enrollmentJoinSchema } from '@/features/enrollments/validation';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { CreateView } from '@/shared/components/refine-ui/views/create-view';
import { Separator } from '@/shared/components/ui/separator';
import { User } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreate, useGetIdentity } from '@refinedev/core';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const EnrollmentsJoinPage = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetIdentity<User>();

  const {
    mutateAsync: joinEnrollment,
    mutation: { isPending },
  } = useCreate();

  const form = useForm<EnrollmentJoinFormValues>({
    resolver: zodResolver(enrollmentJoinSchema),
    defaultValues: { inviteCode: '' },
  });

  const inviteCode = form.watch('inviteCode');

  const handleSubmit = async (values: EnrollmentJoinFormValues) => {
    if (!currentUser?.id) return;

    const response = await joinEnrollment({
      resource: 'enrollments/join',
      values: {
        inviteCode: values.inviteCode,
        studentId: currentUser.id,
      },
    });

    navigate('/enrollments/confirm', {
      state: { enrollment: response?.data },
    });
  };

  const isSubmitDisabled = isPending || !currentUser?.id || !inviteCode;

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Join by Invite Code</h1>
      <div className="intro-row">
        <p>Enter the invite code provided by your instructor.</p>
      </div>

      <Separator />

      <JoinClassForm
        form={form}
        onSubmit={handleSubmit}
        currentUser={currentUser}
        isSubmitting={isPending}
        isSubmitDisabled={isSubmitDisabled}
      />
    </CreateView>
  );
};

export default EnrollmentsJoinPage;
