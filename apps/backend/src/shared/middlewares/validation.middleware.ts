import { logger } from '@/shared/logger';
import { NextFunction, Request, Response } from 'express';
import { z, ZodSchema } from 'zod';

export const validate = (schema: { body?: ZodSchema; query?: ZodSchema; params?: ZodSchema }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }

      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }

      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn('Validation error', {
          path: req.path,
          method: req.method,
          errors: error.errors,
        });

        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }

      logger.error('Unexpected validation error', { error });
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};
