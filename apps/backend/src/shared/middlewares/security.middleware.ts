import { NextFunction, Request, Response } from 'express';

import { logger } from '@/shared/logger';

import { AppError } from './error.middleware';

export const securityMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (['PATCH', 'POST', 'PUT'].includes(req.method)) {
      const contentType = req.get('Content-Type');
      if (!contentType?.includes('application/json')) {
        logger.warn('Invalid or missing Content-Type', {
          contentType,
          ip: req.ip,
          method: req.method,
          path: req.path,
        });
        throw new AppError('Content-Type must be application/json', 415);
      }
    }

    const headerCount = Object.keys(req.headers).length;
    if (headerCount > 50) {
      logger.warn('Excessive headers detected', {
        headerCount,
        ip: req.ip,
        path: req.path,
      });
      throw new AppError('Too many headers', 400);
    }

    const suspiciousPatterns = [/\.\.[/\\]/g, /<script|javascript:/gi, /union.*select/gi];

    const checkForMaliciousInput = (value: unknown): boolean => {
      if (typeof value === 'string') {
        return suspiciousPatterns.some((pattern) => pattern.test(value));
      }
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(checkForMaliciousInput);
      }
      return false;
    };

    const inputs = { ...req.params, ...req.query, ...req.body };
    if (checkForMaliciousInput(inputs)) {
      logger.error('Malicious input detected', {
        ip: req.ip,
        method: req.method,
        path: req.path,
        userAgent: req.get('user-agent'),
      });
      throw new AppError('Invalid request', 400);
    }

    next();
  } catch (error) {
    next(error);
  }
};
