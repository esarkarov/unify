import { toNodeHandler } from 'better-auth/node';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';

import { registerDocumentationRoutes } from '@/shared/app/documentation';
import { registerHealthCheckRoute } from '@/shared/app/health';
import { registerApiRoutes } from '@/shared/app/routes';
import { corsConfig } from '@/shared/config/cors.config';
import { helmetConfig } from '@/shared/config/helmet.config';
import { apiRateLimiter, globalRateLimiter } from '@/shared/config/security.config';
import { auth } from '@/shared/lib/auth';
import { errorHandler } from '@/shared/middlewares/error.middleware';
import { requestLogger } from '@/shared/middlewares/request-logger.middleware';
import { securityMiddleware } from '@/shared/middlewares/security.middleware';

export function createApp(): Application {
  const app = express();

  app.set('trust proxy', 1);

  app.use(helmet(helmetConfig));
  app.use(cors(corsConfig));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(compression());

  app.use(securityMiddleware);
  app.use(globalRateLimiter);
  app.use(requestLogger);

  app.all('/api/auth/*splat', toNodeHandler(auth));

  registerHealthCheckRoute(app);
  registerDocumentationRoutes(app);
  registerApiRoutes(app, apiRateLimiter);

  app.use(errorHandler);

  return app;
}
