import { NextFunction, Request, Response } from 'express';
import { z, ZodSchema } from 'zod';

import { logger } from '@/shared/logger';

export const validate = (schema: { body?: ZodSchema; params?: ZodSchema; query?: ZodSchema }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }

      if (schema.query) {
        res.locals.validatedQuery = await schema.query.parseAsync(req.query);
      }

      if (schema.params) {
        res.locals.validatedParams = await schema.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn('Validation error', {
          errors: error.errors,
          method: req.method,
          path: req.path,
        });

        return res.status(400).json({
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
          error: 'Validation failed',
        });
      }

      logger.error('Unexpected validation error', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};
