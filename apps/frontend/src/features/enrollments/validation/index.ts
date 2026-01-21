import z from 'zod';

export const enrollmentSchema = z.object({
  classId: z.coerce.number().min(1, 'Class is required'),
});

export const enrollmentJoinSchema = z.object({
  inviteCode: z.string().min(3, 'Invite code is required'),
});

export type EnrollmentJoinFormValues = z.infer<typeof enrollmentJoinSchema>;
export type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;
