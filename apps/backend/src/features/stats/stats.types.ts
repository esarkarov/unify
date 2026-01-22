import z from 'zod';

import { classes } from '@/features/classes/classes.schema';
import { getLatestStatsQuerySchema } from '@/features/stats/stats.validation';
import { subjects } from '@/features/subjects/subjects.schema';
import { user } from '@/shared/db/schema/auth.schema';
import { UserRoles } from '@/shared/types';

export type Class = typeof classes.$inferSelect;
export interface ClassesBySubject {
  subjectId: number;
  subjectName: string;
  totalClasses: number;
}
export interface ClassWithRelations {
  bannerCldPubId: null | string;
  bannerUrl: null | string;
  capacity: number;
  createdAt: Date;
  description: null | string;
  id: number;
  inviteCode: string;
  name: string;
  schedules: unknown[];
  status: 'active' | 'archived' | 'inactive';
  subject: null | Subject;
  subjectId: number;
  teacher: null | User;
  teacherId: string;
  updatedAt: Date;
}

export interface GetChartsStatsResponse {
  classesBySubject: ClassesBySubject[];
  subjectsByDepartment: SubjectsByDepartment[];
  usersByRole: UsersByRole[];
}

export type GetLatestStatsQuery = Partial<z.infer<typeof getLatestStatsQuerySchema>>;

export interface GetLatestStatsResponse {
  latestClasses: ClassWithRelations[];
  latestTeachers: User[];
}

export interface GetOverviewStatsResponse {
  classes: number;
  departments: number;
  subjects: number;
  teachers: number;
  users: number;
}

export type Subject = typeof subjects.$inferSelect;

export interface SubjectsByDepartment {
  departmentId: number;
  departmentName: string;
  totalSubjects: number;
}

export type User = typeof user.$inferSelect;

export interface UsersByRole {
  role: UserRoles;
  total: number;
}
