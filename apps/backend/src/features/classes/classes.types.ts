import z from 'zod';

import { classes } from '@/features/classes/classes.schema';
import {
  classParamsSchema,
  createClassBodySchema,
  getClassesQuerySchema,
  paginationQuerySchema,
} from '@/features/classes/classes.validation';
import { departments } from '@/features/departments/departments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { user } from '@/shared/db/schema/auth.schema';
import { Schedule, UserRoles } from '@/shared/types';

export type Class = typeof classes.$inferSelect;
export interface ClassDetailsWithRelations extends ClassWithRelations {
  department: Department | null;
}
export type ClassParams = z.infer<typeof classParamsSchema>;
export type ClassStatus = 'active' | 'archived' | 'inactive';
export type ClassUsersQuery = PaginationQuery & {
  role: UserRoles;
};

export interface ClassWithRelations {
  bannerCldPubId: null | string;
  bannerUrl: null | string;
  capacity: number;
  createdAt: Date;
  description: null | string;
  id: number;
  inviteCode: string;
  name: string;
  schedules: Schedule[];
  status: ClassStatus;
  subject: null | Subject;
  subjectId: number;
  teacher: null | User;
  teacherId: string;
  updatedAt: Date;
}

export type CreateClassDto = z.infer<typeof createClassBodySchema>;

export type Department = typeof departments.$inferSelect;

export type GetClassDetailsResponse = ClassDetailsWithRelations;

export type GetClassesQuery = Partial<z.infer<typeof getClassesQuerySchema>>;

export interface GetClassesResponse {
  data: ClassWithRelations[];
  pagination: PaginationMeta;
}

export interface GetClassUsersResponse {
  data: User[];
  pagination: PaginationMeta;
}

export type NewClass = typeof classes.$inferInsert;
export interface PaginationMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
export type PaginationQuery = Partial<z.infer<typeof paginationQuerySchema>>;
export type Subject = typeof subjects.$inferSelect;
export type User = typeof user.$inferSelect;
