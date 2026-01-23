import { Request, Response } from 'express';

import { classesService } from '@/features/classes/classes.service';
import { logger } from '@/shared/logger';
import { AppError, asyncHandler } from '@/shared/middlewares/error.middleware';
import { UserRoles } from '@/shared/types';

class ClassesController {
  createClass = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Creating class', { body: req.body });

    const createdClass = await classesService.createClass(req.body);

    if (!createdClass) {
      throw new AppError('Failed to create class', 500);
    }

    logger.info('Class created successfully', { id: createdClass.id });

    res.status(201).json({ data: createdClass });
  });
  getClass = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const classId = Number(req.params.id);

    logger.info('Fetching class details', { classId });

    const result = await classesService.getClass(classId);

    logger.info('Class details fetched successfully', { classId });

    res.status(200).json({ data: result });
  });
  getClasses = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Fetching classes', { query: req.query });

    const result = await classesService.getClasses(req.query);

    logger.info('Classes fetched successfully', {
      count: result.data.length,
      total: result.pagination.total,
    });

    res.status(200).json(result);
  });
  getClassUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const classId = Number(req.params.id);
    const { role } = req.query;

    logger.info('Fetching class users', { classId, query: req.query, role });

    const result = await classesService.getClassUsers(classId, {
      ...req.query,
      role: role as UserRoles,
    });

    logger.info('Class users fetched successfully', {
      classId,
      count: result.data.length,
      role,
      total: result.pagination.total,
    });

    res.status(200).json(result);
  });
}

export const classesController = new ClassesController();
