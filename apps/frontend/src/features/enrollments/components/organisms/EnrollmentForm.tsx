import { ClassDetails } from '@/features/classes/types';
import { ClassSelectField } from '@/features/enrollments/components/molecules/ClassSelectField';
import { StudentInfoField } from '@/features/enrollments/components/molecules/StudentInfoField';
import { EnrollmentFormValues } from '@/features/enrollments/validation';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form } from '@/shared/components/ui/form';
import { Separator } from '@/shared/components/ui/separator';
import { User } from '@/shared/types';
import { useForm } from 'react-hook-form';

interface EnrollmentFormProps {
  form: ReturnType<typeof useForm<EnrollmentFormValues>>;
  onSubmit: (values: EnrollmentFormValues) => Promise<void>;
  classes: ClassDetails[];
  isClassesLoading: boolean;
  currentUser: User | undefined;
  isSubmitting: boolean;
  isSubmitDisabled: boolean;
}

export const EnrollmentForm = ({
  form,
  onSubmit,
  classes,
  isClassesLoading,
  currentUser,
  isSubmitting,
  isSubmitDisabled,
}: EnrollmentFormProps) => (
  <div className="my-4 flex items-center">
    <Card className="class-form-card">
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">Enrollment Form</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="mt-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5">
            <ClassSelectField
              control={form.control}
              classes={classes}
              isLoading={isClassesLoading}
            />

            <StudentInfoField currentUser={currentUser} />

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitDisabled}
              aria-busy={isSubmitting}>
              {isSubmitting ? 'Enrolling...' : 'Enroll'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  </div>
);
