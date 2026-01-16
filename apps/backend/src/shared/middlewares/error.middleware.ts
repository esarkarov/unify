import { logger } from '@/shared/logger';
import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    logger.error('Application error', {
      message: err.message,
      statusCode: err.statusCode,
      path: req.path,
      method: req.method,
      stack: err.stack,
    });

    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  logger.error('Unexpected error', {
    message: err.message,
    path: req.path,
    method: req.method,
    stack: err.stack,
  });

  return res.status(500).json({
    error: 'Internal server error',
  });
};

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
