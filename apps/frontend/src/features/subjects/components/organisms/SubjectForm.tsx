import { Department } from '@/features/departments/types';
import { SubjectFormValues } from '@/features/subjects/validation';
import { RequiredMark } from '@/shared/components/atoms/RequiredMark';
import { Button } from '@/shared/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';

interface SubjectFormProps {
  form: UseFormReturn<SubjectFormValues>;
  onSubmit: (values: SubjectFormValues) => void | Promise<void>;
  departments: Department[];
  isLoading: boolean;
  isSubmitting: boolean;
  submitLabel?: string;
}

export const SubjectForm = ({
  form,
  onSubmit,
  departments,
  isLoading,
  isSubmitting,
  submitLabel = 'Create Subject',
}: SubjectFormProps) => {
  const { control, handleSubmit } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6">
        <FormField
          control={control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Department <RequiredMark />
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value ? String(field.value) : ''}
                disabled={isLoading || isSubmitting}>
                <FormControl>
                  <SelectTrigger
                    className="w-full"
                    aria-label="Select department">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments.length === 0 && !isLoading ? (
                    <div className="px-2 py-6 text-center text-sm text-muted-foreground">No departments available</div>
                  ) : (
                    departments.map((department) => (
                      <SelectItem
                        key={department.id}
                        value={String(department.id)}>
                        {department.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subject Name <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Intro to Programming"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subject Code <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="CS101"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
                  placeholder="Describe the subject focus..."
                  className="min-h-28 resize-none"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
