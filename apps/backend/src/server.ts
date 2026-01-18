import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import departmentsRouter from '@/features/departments/departments.routes';
import subjectsRouter from '@/features/subjects/subjects.routes';
import { swaggerSpec } from '@/shared/config/swagger.config';
import { logger } from '@/shared/logger';
import { errorHandler } from '@/shared/middlewares/error.middleware';
import { notFoundHandler } from '@/shared/middlewares/not-found.middleware';
import { requestLogger } from '@/shared/middlewares/request-logger.middleware';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    origin: process.env.FRONTEND_URL || '*',
  })
);

app.use(requestLogger);

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

app.use('/api/subjects', subjectsRouter);
app.use('/api/departments', departmentsRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server started successfully`, {
    docsUrl: `http://localhost:${PORT}/api-docs`,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    port: PORT,
  });
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
  logger.error('Uncaught Exception - shutting down', {
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection - shutting down', {
    promise,
    reason,
  });
  process.exit(1);
});

export default app;
