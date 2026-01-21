import { Request, Response } from 'express';

import { usersService } from '@/features/users/users.service';
import { logger } from '@/shared/logger';
import { asyncHandler } from '@/shared/middlewares/error.middleware';

class UsersController {
  getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id as string;

    logger.info('Fetching user details', { userId });

    const result = await usersService.getUser(userId);

    logger.info('User details fetched successfully', { userId });

    res.status(200).json({ data: result });
  });

  getUserDepartments = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id as string;

    logger.info('Fetching user departments', { query: req.query, userId });

    const result = await usersService.getUserDepartments(userId, req.query);

    logger.info('User departments fetched successfully', {
      count: result.data.length,
      total: result.pagination.total,
      userId,
    });

    res.status(200).json(result);
  });

  getUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Fetching users', { query: req.query });

    const result = await usersService.getUsers(req.query);

    logger.info('Users fetched successfully', {
      count: result.data.length,
      total: result.pagination.total,
    });

    res.status(200).json(result);
  });

  getUserSubjects = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id as string;

    logger.info('Fetching user subjects', { query: req.query, userId });

    const result = await usersService.getUserSubjects(userId, req.query);

    logger.info('User subjects fetched successfully', {
      count: result.data.length,
      total: result.pagination.total,
      userId,
    });

    res.status(200).json(result);
  });
}

export const usersController = new UsersController();
