import http from 'http';

import { logger } from '@/shared/logger';

const GRACEFUL_SHUTDOWN_TIMEOUT = 10000;

export function setupGracefulShutdown(server: http.Server): void {
  const shutdown = (signal: string) => {
    logger.info(`${signal} received, starting graceful shutdown`);

    server.close(() => {
      logger.info('Server closed, all connections terminated');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Graceful shutdown timeout exceeded, forcing shutdown');
      process.exit(1);
    }, GRACEFUL_SHUTDOWN_TIMEOUT);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception - shutting down', {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: unknown) => {
    logger.error('Unhandled Rejection - shutting down', { reason });
    process.exit(1);
  });
}
