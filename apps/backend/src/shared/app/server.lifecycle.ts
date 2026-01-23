import { Application } from 'express';
import http from 'http';

import { logger } from '@/shared/logger';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

export function startServer(app: Application): http.Server {
  const server = app.listen(PORT, () => {
    logger.info('Server started successfully', {
      environment: NODE_ENV,
      nodeVersion: process.version,
      port: PORT,
    });

    if (NODE_ENV === 'development') {
      console.log(`
╔═══════════════════════════════════════════════════════╗
║  Server running on port ${PORT}                        
║  API Docs: http://localhost:${PORT}/api-docs          
╚═══════════════════════════════════════════════════════╝
      `);
    }
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      logger.error(`Port ${PORT} is already in use`);
    } else {
      logger.error('Server startup error', {
        error: error.message,
        stack: error.stack,
      });
    }
    process.exit(1);
  });

  return server;
}
