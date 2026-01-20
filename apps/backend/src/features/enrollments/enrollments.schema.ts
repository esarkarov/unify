import { index, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

import { classes } from '@/features/classes/classes.schema';
import { timestamps } from '@/shared/db/schema';
import { user } from '@/shared/db/schema/auth.schema';

export const enrollments = pgTable(
  'enrollments',
  {
    classId: integer('class_id')
      .notNull()
      .references(() => classes.id, { onDelete: 'cascade' }),

    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    studentId: text('student_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    ...timestamps,
  },
  (table) => ({
    classIdIdx: index('enrollments_class_id_idx').on(table.classId),
    studentClassUnique: index('enrollments_student_class_unique').on(table.studentId, table.classId),
    studentIdIdx: index('enrollments_student_id_idx').on(table.studentId),
  })
);

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  class: one(classes, {
    fields: [enrollments.classId],
    references: [classes.id],
  }),
  student: one(user, {
    fields: [enrollments.studentId],
    references: [user.id],
  }),
}));
