import { subjectsRepository } from '@/features/subjects/subjects.repository';
import { CreateSubjectDto, GetSubjectClassesQuery, GetSubjectsQuery } from '@/features/subjects/subjects.types';
import { logger } from '@/shared/logger';
import { AppError } from '@/shared/middlewares/error.middleware';
import { UserRoles } from '@/shared/types';

class SubjectsService {
  async createSubject(dto: CreateSubjectDto) {
    try {
      logger.debug('Creating subject in repository', { dto });

      const created = await subjectsRepository.create(dto);

      if (!created) {
        throw new AppError('Failed to create subject', 500);
      }

      return created;
    } catch (error) {
      if (error instanceof AppError) throw error;

      logger.error('Error creating subject', { dto, error });
      throw new AppError('Failed to create subject', 500);
    }
  }

  async getSubjectClasses(subjectId: number, query: GetSubjectClassesQuery) {
    try {
      const { limit = 10, page = 1 } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Fetching subject classes', { limit, page, subjectId });

      const [data, total] = await Promise.all([
        subjectsRepository.findClassesBySubject(subjectId, limitPerPage, offset),
        subjectsRepository.countClasses(subjectId),
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
      logger.error('Error fetching subject classes', { error, subjectId });
      throw new AppError('Failed to fetch subject classes', 500);
    }
  }

  async getSubjectDetails(subjectId: number) {
    try {
      logger.debug('Fetching subject details', { subjectId });

      const subject = await subjectsRepository.findById(subjectId);

      if (!subject) {
        throw new AppError('Subject not found', 404);
      }

      const classesCount = await subjectsRepository.countClasses(subjectId);

      return {
        subject,
        totals: {
          classes: classesCount,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;

      logger.error('Error fetching subject details', { error, subjectId });
      throw new AppError('Failed to fetch subject details', 500);
    }
  }

  async getSubjects(query: GetSubjectsQuery) {
    try {
      const { department, limit = 10, page = 1, search } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Building where clause', { department, search });

      const whereClause = subjectsRepository.buildWhereClause(
        search as string | undefined,
        department as string | undefined
      );

      const [data, total] = await Promise.all([
        subjectsRepository.findMany(whereClause, limitPerPage, offset),
        subjectsRepository.count(whereClause),
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
      logger.error('Error fetching subjects', { error });
      throw new AppError('Failed to fetch subjects', 500);
    }
  }

  async getSubjectUsers(subjectId: number, role: UserRoles, query: GetSubjectClassesQuery) {
    try {
      if (!role || !['admin', 'student', 'teacher'].includes(role)) {
        throw new AppError('Invalid role. Must be "teacher", "student", or "admin"', 400);
      }

      const { limit = 10, page = 1 } = query;

      const currentPage = Math.max(1, Number(page));
      const limitPerPage = Math.max(1, Number(limit));
      const offset = (currentPage - 1) * limitPerPage;

      logger.debug('Fetching subject users', { limit, page, role, subjectId });

      const [data, total] = await Promise.all([
        subjectsRepository.findUsersBySubject(subjectId, role, limitPerPage, offset),
        subjectsRepository.countUsers(subjectId, role),
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
      if (error instanceof AppError) throw error;

      logger.error('Error fetching subject users', { error, role, subjectId });
      throw new AppError('Failed to fetch subject users', 500);
    }
  }
}

export const subjectsService = new SubjectsService();
