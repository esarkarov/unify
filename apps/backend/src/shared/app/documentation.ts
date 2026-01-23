import { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from '@/shared/config/swagger.config';

export function registerDocumentationRoutes(app: Application): void {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'University API Documentation',
    })
  );

  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
