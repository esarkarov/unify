import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import { timestamps } from '@/shared/db/schema/common.schema';

export const subjects = pgTable('subjects', {
  code: varchar('code', { length: 50 }).notNull().unique(),
  departmentId: integer('department_id')
    .notNull()
    .references(() => departments.id, { onDelete: 'restrict' }),
  description: text('description'),
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  ...timestamps,
});

export const subjectsRelations = relations(subjects, ({ many, one }) => ({
  classes: many(classes),
  department: one(departments, {
    fields: [subjects.departmentId],
    references: [departments.id],
  }),
}));
