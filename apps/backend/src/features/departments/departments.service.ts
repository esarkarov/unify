import { departmentsRepository } from '@/features/departments/departments.repository';
import {
  CreateDepartmentDto,
  GetDepartmentDetailsResponse,
  GetDepartmentsParams,
  GetDepartmentsResponse,
} from '@/features/departments/departments.types';
import { logger } from '@/shared/logger';
import { AppError } from '@/shared/middlewares/error.middleware';

class DepartmentsService {
  async createDepartment(dto: CreateDepartmentDto) {
    try {
      logger.debug('Creating department in repository', { dto });

      const created = await departmentsRepository.create(dto);

      if (!created) {
        throw new AppError('Failed to create department', 500);
      }

      return created;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error creating department', { dto, error });
      throw new AppError('Failed to create department', 500);
    }
  }
  async getDepartment(id: number): Promise<GetDepartmentDetailsResponse> {
    try {
      logger.debug('Fetching department details', { id });

      const department = await departmentsRepository.findById(id);

      if (!department) {
        throw new AppError('Department not found', 404);
      }

      const [subjectsCount, classesCount, enrolledStudentsCount] = await Promise.all([
        departmentsRepository.countSubjects(id),
        departmentsRepository.countClasses(id),
        departmentsRepository.countEnrolledStudents(id),
      ]);

      return {
        department,
        totals: {
          classes: classesCount,
          enrolledStudents: enrolledStudentsCount,
          subjects: subjectsCount,
        },
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error fetching department details', { error, id });
      throw new AppError('Failed to fetch department details', 500);
    }
  }
  async getDepartments(params: GetDepartmentsParams): Promise<GetDepartmentsResponse> {
    try {
      const { limit = 10, page = 1, search } = params;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Building where clause', { search });

      const whereClause = departmentsRepository.buildWhereClause(search as string | undefined);

      const [data, total] = await Promise.all([
        departmentsRepository.findMany(whereClause, limitPerPage, offset),
        departmentsRepository.count(whereClause),
      ]);

      return {
        data,
        pagination: {
          limit: limitPerPage,
          page: currentPage,
          total,
          totalPages: Math.ceil(total / limitPerPage),
        },
      };
    } catch (error) {
      logger.error('Error fetching departments', { error });
      throw new AppError('Failed to fetch departments', 500);
    }
  }
}

export const departmentsService = new DepartmentsService();
