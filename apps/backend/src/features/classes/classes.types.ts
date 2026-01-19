import { classes } from '@/features/classes/classes.schema';

export type Class = typeof classes.$inferSelect;
export type NewClass = typeof classes.$inferInsert;
