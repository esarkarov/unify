import { Request, Response } from 'express';

import { departmentsService } from '@/features/departments/departments.service';
import { logger } from '@/shared/logger';
import { AppError, asyncHandler } from '@/shared/middlewares/error.middleware';

class DepartmentsController {
  createDepartment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Creating department', { body: req.body });

    const createdDepartment = await departmentsService.createDepartment(req.body);

    if (!createdDepartment) {
      throw new AppError('Failed to create department', 500);
    }

    logger.info('Department created successfully', { id: createdDepartment.id });

    res.status(201).json({ data: createdDepartment });
  });

  getDepartments = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Fetching departments', { query: req.query });

    const result = await departmentsService.getDepartments(req.query);

    logger.info('Departments fetched successfully', {
      count: result.data.length,
      total: result.pagination.total,
    });

    res.status(200).json(result);
  });
}

export const departmentsController = new DepartmentsController();
