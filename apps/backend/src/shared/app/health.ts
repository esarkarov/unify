import { Application, Request, Response } from 'express';

const NODE_ENV = process.env.NODE_ENV || 'development';

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
export function registerHealthCheckRoute(app: Application): void {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      environment: NODE_ENV,
      message: 'Server is running!',
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });
}
