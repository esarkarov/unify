import { toNodeHandler } from 'better-auth/node';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { classesRouter } from '@/features/classes';
import { departmentsRouter } from '@/features/departments';
import { enrollmentsRouter } from '@/features/enrollments';
import { subjectsRouter } from '@/features/subjects';
import { usersRouter } from '@/features/users';
import { corsConfig } from '@/shared/config/cors.config';
import { helmetConfig } from '@/shared/config/helmet.config';
import { apiRateLimiter, globalRateLimiter } from '@/shared/config/security.config';
import { swaggerSpec } from '@/shared/config/swagger.config';
import { auth } from '@/shared/lib/auth';
import { logger } from '@/shared/logger';
import { errorHandler } from '@/shared/middlewares/error.middleware';
import { requestLogger } from '@/shared/middlewares/request-logger.middleware';
import { securityMiddleware } from '@/shared/middlewares/security.middleware';

const app = express();
const PORT = process.env.PORT;

app.set('trust proxy', 1);

app.use(helmet(helmetConfig));
app.use(cors(corsConfig));
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());
app.use(securityMiddleware);
app.use(globalRateLimiter);
app.use(requestLogger);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Health check
 *     description: Check if the API is running
 *     responses:
 *       200:
 *         description: API is running
 */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running!',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'University API Documentation',
  })
);

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api', apiRateLimiter);
app.use('/api/subjects', subjectsRouter);
app.use('/api/departments', departmentsRouter);
app.use('/api/classes', classesRouter);
app.use('/api/users', usersRouter);
app.use('/api/enrollments', enrollmentsRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info('Server started successfully', {
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    port: PORT,
  });

  console.log(`
    Server running on port ${PORT}
    API Docs: http://localhost:${PORT}/api-docs
  `);
});

const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received, starting graceful shutdown`);

  server.close(() => {
    logger.info('Server closed successfully');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', { error: error.message, stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Rejection', { reason });
  process.exit(1);
});

export default app;
