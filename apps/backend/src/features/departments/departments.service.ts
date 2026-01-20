import { departmentsRepository } from '@/features/departments/departments.repository';
import {
  CreateDepartmentDto,
  GetDepartmentClassesQuery,
  GetDepartmentClassesResponse,
  GetDepartmentDetailsResponse,
  GetDepartmentsQuery,
  GetDepartmentsResponse,
  GetDepartmentSubjectsQuery,
  GetDepartmentSubjectsResponse,
  GetDepartmentUsersQuery,
  GetDepartmentUsersResponse,
} from '@/features/departments/departments.types';
import { logger } from '@/shared/logger';
import { AppError } from '@/shared/middlewares/error.middleware';
import { UserRoles } from '@/shared/types';

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
  async getDepartmentClasses(id: number, query: GetDepartmentClassesQuery): Promise<GetDepartmentClassesResponse> {
    try {
      const { limit = 10, page = 1 } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Fetching department classes', { currentPage, id, limitPerPage });

      const [data, total] = await Promise.all([
        departmentsRepository.findClasses(id, limitPerPage, offset),
        departmentsRepository.countClasses(id),
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
      logger.error('Error fetching department classes', { error, id });
      throw new AppError('Failed to fetch department classes', 500);
    }
  }
  async getDepartments(query: GetDepartmentsQuery): Promise<GetDepartmentsResponse> {
    try {
      const { limit = 10, page = 1, search } = query;

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
  async getDepartmentSubjects(id: number, query: GetDepartmentSubjectsQuery): Promise<GetDepartmentSubjectsResponse> {
    try {
      const { limit = 10, page = 1 } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Fetching department subjects', { currentPage, id, limitPerPage });

      const [data, total] = await Promise.all([
        departmentsRepository.findSubjects(id, limitPerPage, offset),
        departmentsRepository.countSubjects(id),
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
      logger.error('Error fetching department subjects', { error, id });
      throw new AppError('Failed to fetch department subjects', 500);
    }
  }
  async getDepartmentUsers(id: number, query: GetDepartmentUsersQuery): Promise<GetDepartmentUsersResponse> {
    try {
      const { limit = 10, page = 1, role } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Fetching department users', { currentPage, id, limitPerPage, role });

      const [data, total] = await Promise.all([
        departmentsRepository.findUsers(id, role as UserRoles, limitPerPage, offset),
        departmentsRepository.countUsers(id, role as UserRoles),
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
      logger.error('Error fetching department users', { error, id, role: query.role });
      throw new AppError('Failed to fetch department users', 500);
    }
  }
}

export const departmentsService = new DepartmentsService();
