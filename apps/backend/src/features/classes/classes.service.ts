import { classesRepository } from '@/features/classes/classes.repository';
import {
  ClassUsersQuery,
  CreateClassDto,
  GetClassDetailsResponse,
  GetClassesQuery,
  GetClassesResponse,
  GetClassUsersResponse,
} from '@/features/classes/classes.types';
import { logger } from '@/shared/logger';
import { AppError } from '@/shared/middlewares/error.middleware';

class ClassesService {
  async createClass(dto: CreateClassDto) {
    try {
      logger.debug('Creating class in repository', { dto });

      const inviteCode = Math.random().toString(36).substring(2, 9);
      const created = await classesRepository.create({ ...dto, inviteCode });

      if (!created) {
        throw new AppError('Failed to create class', 500);
      }

      return created;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error creating class', { dto, error });
      throw new AppError('Failed to create class', 500);
    }
  }
  async getClass(id: number): Promise<GetClassDetailsResponse> {
    try {
      logger.debug('Fetching class details', { id });

      const classDetails = await classesRepository.findById(id);

      if (!classDetails) {
        throw new AppError('Class not found', 404);
      }

      return classDetails;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error fetching class details', { error, id });
      throw new AppError('Failed to fetch class details', 500);
    }
  }
  async getClasses(query: GetClassesQuery): Promise<GetClassesResponse> {
    try {
      const { limit = 10, page = 1, search, subject, teacher } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Building where clause', { search, subject, teacher });

      const whereClause = classesRepository.buildWhereClause(search, subject, teacher);

      const [data, total] = await Promise.all([
        classesRepository.findMany(whereClause, limitPerPage, offset),
        classesRepository.count(whereClause),
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
      logger.error('Error fetching classes', { error });
      throw new AppError('Failed to fetch classes', 500);
    }
  }
  async getClassUsers(id: number, query: ClassUsersQuery): Promise<GetClassUsersResponse> {
    try {
      const { limit = 10, page = 1, role } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Fetching class users', { currentPage, id, limitPerPage, role });

      const [data, total] = await Promise.all([
        classesRepository.findUsers(id, role, limitPerPage, offset),
        classesRepository.countUsers(id, role),
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
      logger.error('Error fetching class users', { error, id, role: query.role });
      throw new AppError('Failed to fetch class users', 500);
    }
  }
}

export const classesService = new ClassesService();
