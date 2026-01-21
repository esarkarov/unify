import { EnrollmentJoinFormValues } from '@/features/enrollments/validation';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useForm } from 'react-hook-form';

interface InviteCodeFieldProps {
  control: ReturnType<typeof useForm<EnrollmentJoinFormValues>>['control'];
}

export const InviteCodeField = ({ control }: InviteCodeFieldProps) => (
  <FormField
    control={control}
    name="inviteCode"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Invite Code{' '}
          <span
            className="text-orange-600"
            aria-label="required">
            *
          </span>
        </FormLabel>
        <FormControl>
          <Input
            placeholder="Enter invite code"
            {...field}
            autoComplete="off"
            aria-describedby="invite-code-description"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
