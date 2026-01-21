import { ClassDetails } from '@/features/classes/types';
import { EnrollmentForm } from '@/features/enrollments/components/organisms/EnrollmentForm';
import { CLASSES_PAGE_SIZE } from '@/features/enrollments/constants';
import { EnrollmentFormValues, enrollmentSchema } from '@/features/enrollments/validation';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { CreateView } from '@/shared/components/refine-ui/views/create-view';
import { Separator } from '@/shared/components/ui/separator';
import { User } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreate, useGetIdentity, useList } from '@refinedev/core';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const EnrollmentCreatePage = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetIdentity<User>();

  const {
    mutateAsync: createEnrollment,
    mutation: { isPending },
  } = useCreate();

  const { query: classesQuery } = useList<ClassDetails>({
    resource: 'classes',
    pagination: { pageSize: CLASSES_PAGE_SIZE },
  });

  const classes = classesQuery.data?.data ?? [];
  const isClassesLoading = classesQuery.isLoading;

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: { classId: 0 },
  });

  const selectedClassId = form.watch('classId');

  const handleSubmit = async (values: EnrollmentFormValues) => {
    if (!currentUser?.id) return;

    const response = await createEnrollment({
      resource: 'enrollments',
      values: {
        classId: values.classId,
        studentId: currentUser.id,
      },
    });

    navigate('/enrollments/confirm', {
      state: { enrollment: response?.data },
    });
  };

  const isSubmitDisabled = isPending || isClassesLoading || !currentUser?.id || !classes.length || !selectedClassId;

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Enroll in a Class</h1>
      <div className="intro-row">
        <p>Select a class to enroll as the current user.</p>
      </div>

      <Separator />

      <EnrollmentForm
        form={form}
        onSubmit={handleSubmit}
        classes={classes}
        isClassesLoading={isClassesLoading}
        currentUser={currentUser}
        isSubmitting={isPending}
        isSubmitDisabled={isSubmitDisabled}
      />
    </CreateView>
  );
};

export default EnrollmentCreatePage;
