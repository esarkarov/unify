import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

import { logger } from '@/shared/logger';

export const globalRateLimiter = rateLimit({
  handler: (req: Request, res: Response) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      method: req.method,
      path: req.path,
    });
    res.status(429).json({
      error: 'Too many requests, please try again later.',
    });
  },
  legacyHeaders: false,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  windowMs: 15 * 60 * 1000,
});

export const apiRateLimiter = rateLimit({
  handler: (req: Request, res: Response) => {
    logger.warn('API rate limit exceeded', {
      ip: req.ip,
      method: req.method,
      path: req.path,
    });
    res.status(429).json({
      error: 'API rate limit exceeded, please try again later.',
    });
  },
  legacyHeaders: false,
  max: 50,
  message: { error: 'API rate limit exceeded, please try again later.' },
  standardHeaders: true,
  windowMs: 15 * 60 * 1000,
});
