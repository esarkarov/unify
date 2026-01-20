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
  getSubject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const subjectId = Number(req.params.id);

    logger.info('Fetching subject details', { subjectId });

    const result = await subjectsService.getSubjectDetails(subjectId);

    logger.info('Subject details fetched successfully', { subjectId });

    res.status(200).json({ data: result });
  });
  getSubjectClasses = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const subjectId = Number(req.params.id);

    logger.info('Fetching subject classes', { query: req.query, subjectId });

    const result = await subjectsService.getSubjectClasses(subjectId, req.query);

    logger.info('Subject classes fetched successfully', {
      count: result.data.length,
      subjectId,
      total: result.pagination.total,
    });

    res.status(200).json(result);
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
  getSubjectUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const subjectId = Number(req.params.id);

    logger.info('Fetching subject users', { query: req.query, subjectId });

    const result = await subjectsService.getSubjectUsers(subjectId, req.query);

    logger.info('Subject users fetched successfully', {
      count: result.data.length,
      role: req.query.role,
      subjectId,
      total: result.pagination.total,
    });

    res.status(200).json(result);
  });
}

export const subjectsController = new SubjectsController();
