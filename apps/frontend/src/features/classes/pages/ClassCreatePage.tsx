import { ClassForm } from '@/features/classes/components/organisms/ClassForm';
import { SUBJECTS_PAGE_SIZE, TEACHERS_PAGE_SIZE } from '@/features/classes/constants';
import { classCreateSchema, ClassFormValues } from '@/features/classes/validation';
import { Subject } from '@/features/subjects/types';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { CreateView } from '@/shared/components/refine-ui/views/create-view';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { User } from '@/shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBack, useList, type BaseRecord, type HttpError } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { useCallback } from 'react';

const ClassCreatePage = () => {
  const back = useBack();

  const form = useForm<BaseRecord, HttpError, ClassFormValues>({
    resolver: zodResolver(classCreateSchema),
    refineCoreProps: {
      resource: 'classes',
      action: 'create',
    },
    defaultValues: {
      status: 'active',
    },
  });

  const {
    refineCore: { onFinish },
    formState: { isSubmitting },
  } = form;

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

  const onSubmit = useCallback(
    async (values: ClassFormValues) => {
      try {
        await onFinish(values);
      } catch (error) {
        console.error('Error creating class:', error);
      }
    },
    [onFinish]
  );

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Create a Class</h1>

      <div className="intro-row">
        <p className="text-muted-foreground">Provide the required information below to add a class.</p>
        <Button
          onClick={back}
          variant="outline"
          aria-label="Go back to previous page">
          <ChevronLeft aria-hidden="true" />
        </Button>
      </div>

      <Separator className="my-2" />

      <Card className="class-form-card">
        <CardHeader className="relative z-10">
          <CardTitle className="pb-0 text-2xl font-bold text-gradient-orange">Fill out form</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="mt-7">
          <ClassForm
            form={form}
            onSubmit={onSubmit}
            subjects={subjects}
            teachers={teachers}
            isSubjectsLoading={subjectsQuery.isLoading}
            isTeachersLoading={teachersQuery.isLoading}
            isSubmitting={isSubmitting}
            submitLabel="Create Class"
          />
        </CardContent>
      </Card>
    </CreateView>
  );
};

export default ClassCreatePage;
