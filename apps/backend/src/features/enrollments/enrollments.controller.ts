import { Request, Response } from 'express';

import { enrollmentsService } from '@/features/enrollments/enrollments.service';
import { logger } from '@/shared/logger';
import { asyncHandler } from '@/shared/middlewares/error.middleware';

class EnrollmentsController {
  createEnrollment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Creating enrollment', { body: req.body });

    const enrollment = await enrollmentsService.createEnrollment(req.body);

    logger.info('Enrollment created successfully', { id: enrollment.id });

    res.status(201).json({ data: enrollment });
  });

  joinClass = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    logger.info('Student joining class', { body: req.body });

    const enrollment = await enrollmentsService.joinClass(req.body);

    logger.info('Student joined class successfully', { id: enrollment.id });

    res.status(201).json({ data: enrollment });
  });
}

export const enrollmentsController = new EnrollmentsController();
