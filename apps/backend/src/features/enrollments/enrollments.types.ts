import { enrollments } from '@/features/enrollments/enrollments.schema';

export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;
