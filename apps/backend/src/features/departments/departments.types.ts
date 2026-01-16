import { departments } from "@/features/departments/departments.schema";

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
