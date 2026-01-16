import { NextFunction, Request, Response } from 'express';

import { logger } from '@/shared/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'warn' : 'info';

    logger[logLevel]('HTTP Request', {
      duration: `${duration}ms`,
      ip: req.ip,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      userAgent: req.get('user-agent'),
    });
  });

  next();
};
