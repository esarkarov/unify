import { subjects } from '@/features/subjects/subjects.schema';
import { timestamps } from '@/shared/db/schema';
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

export const departments = pgTable('departments', {
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: text('description'),
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  ...timestamps,
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  subjects: many(subjects),
}));
