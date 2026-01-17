import { NextFunction, Request, Response } from 'express';

import { AppError } from '@/shared/middlewares/error.middleware';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Route ${req.method} ${req.path} not found`, 404);
  next(error);
};
