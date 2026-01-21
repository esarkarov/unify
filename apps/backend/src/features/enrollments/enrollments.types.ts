import z from 'zod';

import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import { enrollments } from '@/features/enrollments/enrollments.schema';
import { createEnrollmentBodySchema, joinClassBodySchema } from '@/features/enrollments/enrollments.validation';
import { subjects } from '@/features/subjects/subjects.schema';
import { user } from '@/shared/db/schema/auth.schema';

export type Class = typeof classes.$inferSelect;
export type CreateEnrollmentDto = z.infer<typeof createEnrollmentBodySchema>;
export type Department = typeof departments.$inferSelect;
export type Enrollment = typeof enrollments.$inferSelect;
export interface EnrollmentWithDetails {
  class: Class | null;
  classId: number;
  createdAt: Date;
  department: Department | null;
  id: number;
  studentId: string;
  subject: null | Subject;
  teacher: null | User;
  updatedAt: Date;
}
export type GetEnrollmentDetailsResponse = EnrollmentWithDetails;

export type JoinClassDto = z.infer<typeof joinClassBodySchema>;

export type NewEnrollment = typeof enrollments.$inferInsert;
export type Subject = typeof subjects.$inferSelect;
export type User = typeof user.$inferSelect;
