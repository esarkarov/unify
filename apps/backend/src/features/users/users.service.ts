import { usersRepository } from '@/features/users/users.repository';
import {
  GetUserDepartmentsResponse,
  GetUsersQuery,
  GetUsersResponse,
  GetUserSubjectsResponse,
  PaginationQuery,
  User,
} from '@/features/users/users.types';
import { logger } from '@/shared/logger';
import { AppError } from '@/shared/middlewares/error.middleware';

class UsersService {
  async getUser(id: string): Promise<User> {
    try {
      logger.debug('Fetching user details', { id });

      const userRecord = await usersRepository.findById(id);

      if (!userRecord) {
        throw new AppError('User not found', 404);
      }

      return userRecord;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error fetching user details', { error, id });
      throw new AppError('Failed to fetch user', 500);
    }
  }
  async getUserDepartments(id: string, query: PaginationQuery): Promise<GetUserDepartmentsResponse> {
    try {
      const { limit = 10, page = 1 } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Fetching user departments', { currentPage, id, limitPerPage });

      const userRecord = await usersRepository.findById(id);

      if (!userRecord) {
        throw new AppError('User not found', 404);
      }

      if (userRecord.role !== 'teacher' && userRecord.role !== 'student') {
        return {
          data: [],
          pagination: {
            limit: 0,
            page: 1,
            total: 0,
            totalPages: 0,
          },
        };
      }

      const [data, total] = await Promise.all([
        usersRepository.findDepartments(id, userRecord.role, limitPerPage, offset),
        usersRepository.countDepartments(id, userRecord.role),
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
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error fetching user departments', { error, id });
      throw new AppError('Failed to fetch user departments', 500);
    }
  }
  async getUsers(query: GetUsersQuery): Promise<GetUsersResponse> {
    try {
      const { limit = 10, page = 1, role, search } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Building where clause', { role, search });

      const whereClause = usersRepository.buildWhereClause(search, role);

      const [data, total] = await Promise.all([
        usersRepository.findMany(whereClause, limitPerPage, offset),
        usersRepository.count(whereClause),
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
      logger.error('Error fetching users', { error });
      throw new AppError('Failed to fetch users', 500);
    }
  }
  async getUserSubjects(id: string, query: PaginationQuery): Promise<GetUserSubjectsResponse> {
    try {
      const { limit = 10, page = 1 } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Fetching user subjects', { currentPage, id, limitPerPage });

      const userRecord = await usersRepository.findById(id);

      if (!userRecord) {
        throw new AppError('User not found', 404);
      }

      if (userRecord.role !== 'teacher' && userRecord.role !== 'student') {
        return {
          data: [],
          pagination: {
            limit: 0,
            page: 1,
            total: 0,
            totalPages: 0,
          },
        };
      }

      const [data, total] = await Promise.all([
        usersRepository.findSubjects(id, userRecord.role, limitPerPage, offset),
        usersRepository.countSubjects(id, userRecord.role),
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
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error fetching user subjects', { error, id });
      throw new AppError('Failed to fetch user subjects', 500);
    }
  }
}

export const usersService = new UsersService();
