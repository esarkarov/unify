import { integer, pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const classStatusEnum = pgEnum('class_status', ['active', 'inactive', 'archived']);

export const departments = pgTable('departments', {
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: text('description'),
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 255 }).notNull(),
  ...timestamps,
});

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

export const departmentsRelations = relations(departments, ({ many }) => ({
  subjects: many(subjects),
}));

export const subjectsRelations = relations(subjects, ({ one }) => ({
  department: one(departments, {
    fields: [subjects.departmentId],
    references: [departments.id],
  }),
}));

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
export type NewSubject = typeof subjects.$inferInsert;
export type Subject = typeof subjects.$inferSelect;
