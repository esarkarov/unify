import { Request, Response } from 'express';

import { subjectsService } from '@/features/subjects/subjects.service';
import { logger } from '@/shared/logger';
import { AppError, asyncHandler } from '@/shared/middlewares/error.middleware';

class SubjectsController {
  createSubject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Creating subject', { body: req.body });

    const createdSubject = await subjectsService.createSubject(req.body);

    if (!createdSubject) {
      throw new AppError('Failed to create subject', 500);
    }

    logger.info('Subject created successfully', { id: createdSubject.id });

    res.status(201).json({ data: createdSubject });
  });

  getSubjects = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Fetching subjects', { query: req.query });

    const result = await subjectsService.getSubjects(req.query);

    logger.info('Subjects fetched successfully', {
      count: result.data.length,
      total: result.pagination.total,
    });

    res.status(200).json(result);
  });
}

export const subjectsController = new SubjectsController();
