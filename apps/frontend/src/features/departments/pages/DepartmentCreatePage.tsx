import { DepartmentForm } from '@/features/departments/components/organisms/DepartmentForm';
import { DEFAULT_VALUES } from '@/features/departments/constants';
import { departmentCreateSchema, DepartmentFormValues } from '@/features/departments/validation';
import { Breadcrumb } from '@/shared/components/refine-ui/layout/breadcrumb';
import { CreateView } from '@/shared/components/refine-ui/views/create-view';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBack, type BaseRecord, type HttpError } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { ChevronLeft } from 'lucide-react';
import { useCallback } from 'react';

const DepartmentCreatePage = () => {
  const back = useBack();

  const form = useForm<BaseRecord, HttpError, DepartmentFormValues>({
    resolver: zodResolver(departmentCreateSchema),
    refineCoreProps: {
      resource: 'departments',
      action: 'create',
    },
    defaultValues: DEFAULT_VALUES,
  });

  const {
    refineCore: { onFinish },
    formState: { isSubmitting },
  } = form;

  const onSubmit = useCallback(
    async (values: DepartmentFormValues) => {
      try {
        await onFinish(values);
      } catch (error) {
        console.error('Error creating department:', error);
      }
    },
    [onFinish]
  );

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Create a Department</h1>

      <div className="intro-row">
        <p className="text-muted-foreground">Provide the required information below to add a department.</p>
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
          <DepartmentForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Create Department"
          />
        </CardContent>
      </Card>
    </CreateView>
  );
};

export default DepartmentCreatePage;
