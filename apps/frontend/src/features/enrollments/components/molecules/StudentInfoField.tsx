import { FormControl, FormItem, FormLabel } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { User } from '@/shared/types';

export const StudentInfoField = ({ currentUser }: { currentUser: User | undefined }) => (
  <FormItem>
    <FormLabel>Student</FormLabel>
    <FormControl>
      <Input
        value={currentUser?.email ?? 'Not signed in'}
        readOnly
        aria-readonly="true"
      />
    </FormControl>
  </FormItem>
);
