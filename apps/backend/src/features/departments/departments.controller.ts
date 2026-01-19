import { Request, Response } from 'express';

import { departmentsService } from '@/features/departments/departments.service';
import { logger } from '@/shared/logger';
import { AppError, asyncHandler } from '@/shared/middlewares/error.middleware';
import { UserRoles } from '@/shared/types';

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

  getDepartment = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const departmentId = Number(req.params.id);

    logger.info('Fetching department details', { departmentId });

    const result = await departmentsService.getDepartment(departmentId);

    logger.info('Department details fetched successfully', { departmentId });

    res.status(200).json({ data: result });
  });

  getDepartmentClasses = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const departmentId = Number(req.params.id);

    logger.info('Fetching department classes', { departmentId, query: req.query });

    const result = await departmentsService.getDepartmentClasses(departmentId, req.query);

    logger.info('Department classes fetched successfully', {
      count: result.data.length,
      departmentId,
      total: result.pagination.total,
    });

    res.status(200).json(result);
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

  getDepartmentSubjects = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const departmentId = Number(req.params.id);

    logger.info('Fetching department subjects', { departmentId, query: req.query });

    const result = await departmentsService.getDepartmentSubjects(departmentId, req.query);

    logger.info('Department subjects fetched successfully', {
      count: result.data.length,
      departmentId,
      total: result.pagination.total,
    });

    res.status(200).json(result);
  });

  getDepartmentUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const departmentId = Number(req.params.id);
    const { role } = req.query;

    logger.info('Fetching department users', { departmentId, query: req.query, role });

    const result = await departmentsService.getDepartmentUsers(departmentId, {
      ...req.query,
      role: role as UserRoles,
    });

    logger.info('Department users fetched successfully', {
      count: result.data.length,
      departmentId,
      role,
      total: result.pagination.total,
    });

    res.status(200).json(result);
  });
}

export const departmentsController = new DepartmentsController();
