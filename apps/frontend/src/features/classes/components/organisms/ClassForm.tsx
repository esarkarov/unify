import { ClassFormValues } from '@/features/classes/validation';
import { Subject } from '@/features/subjects/types';
import { RequiredMark } from '@/shared/components/atoms/RequiredMark';
import { UploadWidget } from '@/shared/components/organisms/UploadWidget';
import { Button } from '@/shared/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Separator } from '@/shared/components/ui/separator';
import { Textarea } from '@/shared/components/ui/textarea';
import { User } from '@/shared/types';
import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface ClassFormProps {
  form: UseFormReturn<ClassFormValues>;
  onSubmit: (values: ClassFormValues) => void | Promise<void>;
  subjects: Subject[];
  teachers: User[];
  isSubjectsLoading: boolean;
  isTeachersLoading: boolean;
  isSubmitting: boolean;
  submitLabel?: string;
}

export const ClassForm = ({
  form,
  onSubmit,
  subjects,
  teachers,
  isSubjectsLoading,
  isTeachersLoading,
  isSubmitting,
  submitLabel = 'Create Class',
}: ClassFormProps) => {
  const { control, handleSubmit, formState, watch, setValue } = form;
  const { errors } = formState;
  const bannerPublicId = watch('bannerCldPubId');

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6">
        <FormField
          control={control}
          name="bannerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Banner Image <RequiredMark />
              </FormLabel>
              <FormControl>
                <UploadWidget
                  value={
                    field.value
                      ? {
                          url: field.value,
                          publicId: bannerPublicId ?? '',
                        }
                      : null
                  }
                  onChange={(file) => {
                    if (file) {
                      field.onChange(file.url);
                      setValue('bannerCldPubId', file.publicId, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    } else {
                      field.onChange('');
                      setValue('bannerCldPubId', '', {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }
                  }}
                  aria-describedby="banner-error"
                />
              </FormControl>
              <FormMessage id="banner-error" />
              {errors.bannerCldPubId && !errors.bannerUrl && (
                <p
                  className="text-sm text-destructive"
                  role="alert">
                  {errors.bannerCldPubId.message?.toString()}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Class Name <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Introduction to Biology - Section A"
                  disabled={isSubmitting}
                  aria-describedby="name-error"
                  {...field}
                />
              </FormControl>
              <FormMessage id="name-error" />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="subjectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Subject <RequiredMark />
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                  disabled={isSubjectsLoading || isSubmitting}>
                  <FormControl>
                    <SelectTrigger
                      className="w-full"
                      aria-label="Select subject"
                      aria-describedby="subject-error">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects.length === 0 && !isSubjectsLoading ? (
                      <div className="px-2 py-6 text-center text-sm text-muted-foreground">No subjects available</div>
                    ) : (
                      subjects.map((subject) => (
                        <SelectItem
                          key={subject.id}
                          value={subject.id.toString()}>
                          {subject.name} ({subject.code})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage id="subject-error" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="teacherId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Teacher <RequiredMark />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                  disabled={isTeachersLoading || isSubmitting}>
                  <FormControl>
                    <SelectTrigger
                      className="w-full"
                      aria-label="Select teacher"
                      aria-describedby="teacher-error">
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teachers.length === 0 && !isTeachersLoading ? (
                      <div className="px-2 py-6 text-center text-sm text-muted-foreground">No teachers available</div>
                    ) : (
                      teachers.map((teacher) => (
                        <SelectItem
                          key={teacher.id}
                          value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage id="teacher-error" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Capacity <RequiredMark />
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="30"
                    disabled={isSubmitting}
                    aria-describedby="capacity-error"
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? Number(value) : undefined);
                    }}
                    value={(field.value as number | undefined) ?? ''}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage id="capacity-error" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Status <RequiredMark />
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isSubmitting}>
                  <FormControl>
                    <SelectTrigger
                      className="w-full"
                      aria-label="Select status"
                      aria-describedby="status-error">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage id="status-error" />
              </FormItem>
            )}
          />
        </div>

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
                  placeholder="Brief description about the class"
                  className="min-h-28 resize-none"
                  disabled={isSubmitting}
                  aria-describedby="description-error"
                  {...field}
                />
              </FormControl>
              <FormMessage id="description-error" />
            </FormItem>
          )}
        />

        <Separator />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              Submitting...
              <Loader2
                className="h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            </span>
          ) : (
            submitLabel
          )}
        </Button>
      </form>
    </Form>
  );
};
