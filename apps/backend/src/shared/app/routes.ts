import { Application, RequestHandler } from 'express';

import { classesRouter } from '@/features/classes';
import { departmentsRouter } from '@/features/departments';
import { enrollmentsRouter } from '@/features/enrollments';
import { subjectsRouter } from '@/features/subjects';
import { usersRouter } from '@/features/users';

export function registerApiRoutes(app: Application, rateLimiter: RequestHandler): void {
  app.use('/api', rateLimiter);

  app.use('/api/subjects', subjectsRouter);
  app.use('/api/departments', departmentsRouter);
  app.use('/api/classes', classesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/enrollments', enrollmentsRouter);
}
