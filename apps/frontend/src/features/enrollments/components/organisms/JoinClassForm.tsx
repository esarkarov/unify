import { InviteCodeField } from '@/features/enrollments/components/molecules/InviteCodeField';
import { StudentInfoField } from '@/features/enrollments/components/molecules/StudentInfoField';
import { EnrollmentJoinFormValues } from '@/features/enrollments/validation';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Form } from '@/shared/components/ui/form';
import { Separator } from '@/shared/components/ui/separator';
import { User } from '@/shared/types';
import { useForm } from 'react-hook-form';

interface JoinClassFormProps {
  form: ReturnType<typeof useForm<EnrollmentJoinFormValues>>;
  onSubmit: (values: EnrollmentJoinFormValues) => Promise<void>;
  currentUser: User | undefined;
  isSubmitting: boolean;
  isSubmitDisabled: boolean;
}

export const JoinClassForm = ({ form, onSubmit, currentUser, isSubmitting, isSubmitDisabled }: JoinClassFormProps) => (
  <div className="my-4 flex items-center">
    <Card className="class-form-card">
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl pb-0 font-bold text-gradient-orange">Join Class</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="mt-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5">
            <InviteCodeField control={form.control} />

            <StudentInfoField currentUser={currentUser} />

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitDisabled}
              aria-busy={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join Class'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  </div>
);
