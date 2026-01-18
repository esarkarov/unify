import { Department } from '@/features/departments/types';
import { SubjectForm } from '@/features/subjects/components/organisms/SubjectForm';
import { DEFAULT_VALUES, DEPARTMENTS_PAGE_SIZE } from '@/features/subjects/constants';
import { subjectCreateSchema, SubjectFormValues } from '@/features/subjects/validation';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { CreateView } from '@/shared/components/refine-ui/views/create-view';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBack, useList, type BaseRecord, type HttpError } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { useCallback } from 'react';

const SubjectCreatePage = () => {
  const back = useBack();

  const form = useForm<BaseRecord, HttpError, SubjectFormValues>({
    resolver: zodResolver(subjectCreateSchema),
    refineCoreProps: {
      resource: 'subjects',
      action: 'create',
    },
    defaultValues: DEFAULT_VALUES,
  });

  const {
    refineCore: { onFinish },
    formState: { isSubmitting },
  } = form;

  const { query: departmentsQuery } = useList<Department>({
    resource: 'departments',
    pagination: {
      pageSize: DEPARTMENTS_PAGE_SIZE,
    },
  });

  const onSubmit = useCallback(
    async (values: SubjectFormValues) => {
      try {
        await onFinish(values);
      } catch (error) {
        console.error('Error creating subject:', error);
      }
    },
    [onFinish]
  );

  const departments = departmentsQuery.data?.data ?? [];
  const isLoading = departmentsQuery.isLoading;

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Create a Subject</h1>

      <div className="intro-row">
        <p className="text-muted-foreground">Provide the required information below to add a subject.</p>
        <Button
          onClick={back}
          variant="outline">
          <ChevronLeft />
        </Button>
      </div>

      <Separator className="my-2" />

      <Card className="class-form-card">
        <CardHeader className="relative z-10">
          <CardTitle className="pb-0 text-2xl font-bold text-gradient-orange">Fill out form</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="mt-7">
          <SubjectForm
            form={form}
            onSubmit={onSubmit}
            departments={departments}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            submitLabel="Create Subject"
          />
        </CardContent>
      </Card>
    </CreateView>
  );
};

export default SubjectCreatePage;
