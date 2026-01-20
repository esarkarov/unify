import { DepartmentFormValues } from '@/features/departments/validation';
import { RequiredMark } from '@/shared/components/atoms/RequiredMark';
import { Button } from '@/shared/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';

interface DepartmentFormProps {
  form: UseFormReturn<DepartmentFormValues>;
  onSubmit: (values: DepartmentFormValues) => void | Promise<void>;
  isSubmitting: boolean;
  submitLabel?: string;
}

export const DepartmentForm = ({
  form,
  onSubmit,
  isSubmitting,
  submitLabel = 'Create Department',
}: DepartmentFormProps) => {
  const { control, handleSubmit } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6">
        <FormField
          control={control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Department Code <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="CS"
                  disabled={isSubmitting}
                  aria-describedby="code-description"
                  {...field}
                />
              </FormControl>
              <FormMessage id="code-description" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Department Name <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Computer Science"
                  disabled={isSubmitting}
                  aria-describedby="name-description"
                  {...field}
                />
              </FormControl>
              <FormMessage id="name-description" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <RequiredMark />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the department focus..."
                  className="min-h-28 resize-none"
                  disabled={isSubmitting}
                  aria-describedby="description-description"
                  {...field}
                />
              </FormControl>
              <FormMessage id="description-description" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto">
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
      </form>
    </Form>
  );
};
