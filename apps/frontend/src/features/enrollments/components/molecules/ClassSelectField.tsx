import { ClassDetails } from '@/features/classes/types';
import type { EnrollmentFormValues } from '@/features/enrollments/validation';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { useForm } from 'react-hook-form';

interface ClassSelectFieldProps {
  control: ReturnType<typeof useForm<EnrollmentFormValues>>['control'];
  classes: ClassDetails[];
  isLoading: boolean;
}

export const ClassSelectField = ({ control, classes, isLoading }: ClassSelectFieldProps) => (
  <FormField
    control={control}
    name="classId"
    render={({ field }) => (
      <FormItem>
        <FormLabel>
          Class{' '}
          <span
            className="text-orange-600"
            aria-label="required">
            *
          </span>
        </FormLabel>
        <Select
          onValueChange={(value) => field.onChange(Number(value))}
          value={field.value ? String(field.value) : ''}
          disabled={isLoading}>
          <FormControl>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {classes.length === 0 ? (
              <div className="px-2 py-3 text-sm text-muted-foreground">No classes available</div>
            ) : (
              classes.map((classItem) => (
                <SelectItem
                  key={classItem.id}
                  value={String(classItem.id)}>
                  {classItem.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
