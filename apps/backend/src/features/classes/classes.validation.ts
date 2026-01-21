import { z } from 'zod';

const scheduleSchema = z.object({
  day: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  startTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
});

export const getClassesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
  search: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  teacher: z.string().trim().optional(),
});

export const createClassBodySchema = z.object({
  bannerCldPubId: z.string().trim().optional(),
  bannerUrl: z.string().trim().url('Invalid URL').optional(),
  capacity: z.number().int().positive().default(50),
  description: z.string().trim().optional(),
  name: z.string().trim().min(1, 'Name is required').max(255, 'Name too long'),
  schedules: z.array(scheduleSchema).optional(),
  status: z.enum(['active', 'inactive', 'archived']).default('active'),
  subjectId: z.number().int().positive('Invalid subject ID'),
  teacherId: z.string().trim().min(1, 'Teacher ID is required'),
});

export const classParamsSchema = z.object({
  id: z.coerce.number().int().positive('Invalid class ID'),
});

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).default(10),
  page: z.coerce.number().int().positive().default(1),
});

export const classUsersQuerySchema = paginationQuerySchema.extend({
  role: z.enum(['teacher', 'student'], {
    errorMap: () => ({ message: 'Role must be either teacher or student' }),
  }),
});

export const classesValidation = {
  createClass: {
    body: createClassBodySchema,
  },

  getClass: {
    params: classParamsSchema,
  },

  getClasses: {
    query: getClassesQuerySchema,
  },

  getClassUsers: {
    params: classParamsSchema,
    query: classUsersQuerySchema,
  },
};
