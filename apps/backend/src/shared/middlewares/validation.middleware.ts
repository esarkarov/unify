import { NextFunction, Request, Response } from 'express';
import { z, ZodSchema } from 'zod';

import { logger } from '@/shared/logger';

export const validate = (schema: { body?: ZodSchema; params?: ZodSchema; query?: ZodSchema }) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        res.status(400).json({
          details: error.errors.map((err) => ({
            code: err.code,
            field: err.path.join('.'),
            message: err.message,
          })),
          error: 'Validation failed',
        });
        return;
      }

      logger.error('Unexpected validation error', { error });
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  };
};
