import cors from 'cors';
import express from 'express';

import subjectsRouter from '@/features/subjects/subjects.routes';
import { logger } from '@/shared/logger';
import { errorHandler } from '@/shared/middlewares/error.middleware';
import { requestLogger } from '@/shared/middlewares/request-logger.middleware';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Server is running!',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/subjects', subjectsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`, {
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
  });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', { error });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', { promise, reason });
  process.exit(1);
});

export default app;
