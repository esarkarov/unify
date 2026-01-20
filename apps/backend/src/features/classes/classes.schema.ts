import { index, integer, jsonb, pgEnum, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

import { enrollments } from '@/features/enrollments/enrollments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { timestamps } from '@/shared/db/schema';
import { user } from '@/shared/db/schema/auth.schema';
import { Schedule } from '@/shared/types';

export const classStatusEnum = pgEnum('class_status', ['active', 'inactive', 'archived']);

export const classes = pgTable(
  'classes',
  {
    bannerCldPubId: text('banner_cld_pub_id'),
    bannerUrl: text('banner_url'),
    capacity: integer('capacity').notNull().default(50),
    description: text('description'),
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    inviteCode: varchar('invite_code', { length: 50 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    schedules: jsonb('schedules').$type<Schedule[]>().notNull(),
    status: classStatusEnum('status').notNull().default('active'),
    subjectId: integer('subject_id')
      .notNull()
      .references(() => subjects.id, { onDelete: 'cascade' }),
    teacherId: text('teacher_id')
      .notNull()
      .references(() => user.id, { onDelete: 'restrict' }),
    ...timestamps,
  },
  (table) => ({
    subjectIdIdx: index('classes_subject_id_idx').on(table.subjectId),
    teacherIdIdx: index('classes_teacher_id_idx').on(table.teacherId),
  })
);

export const classesRelations = relations(classes, ({ many, one }) => ({
  enrollments: many(enrollments),
  subject: one(subjects, {
    fields: [classes.subjectId],
    references: [subjects.id],
  }),
  teacher: one(user, {
    fields: [classes.teacherId],
    references: [user.id],
  }),
}));
