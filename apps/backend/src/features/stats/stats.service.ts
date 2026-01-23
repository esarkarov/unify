import { statsRepository } from '@/features/stats/stats.repository';
import {
  GetChartsStatsResponse,
  GetLatestStatsQuery,
  GetLatestStatsResponse,
  GetOverviewStatsResponse,
} from '@/features/stats/stats.types';
import { logger } from '@/shared/logger';
import { AppError } from '@/shared/middlewares/error.middleware';

class StatsService {
  async getCharts(): Promise<GetChartsStatsResponse> {
    try {
      logger.debug('Fetching chart stats');

      const [usersByRole, subjectsByDepartment, classesBySubject] = await Promise.all([
        statsRepository.aggregateUsersByRole(),
        statsRepository.aggregateSubjectsByDepartment(),
        statsRepository.aggregateClassesBySubject(),
      ]);

      return {
        classesBySubject,
        subjectsByDepartment,
        usersByRole,
      };
    } catch (error) {
      logger.error('Error fetching chart stats', { error });
      throw new AppError('Failed to fetch chart stats', 500);
    }
  }

  async getLatest(query: GetLatestStatsQuery): Promise<GetLatestStatsResponse> {
    try {
      const { limit = 5 } = query;
      const limitPerPage = Math.max(1, Number(limit));

      logger.debug('Fetching latest activity stats', { limit: limitPerPage });

      const [latestClasses, latestTeachers] = await Promise.all([
        statsRepository.findLatestClasses(limitPerPage),
        statsRepository.findLatestTeachers(limitPerPage),
      ]);

      return {
        latestClasses,
        latestTeachers,
      };
    } catch (error) {
      logger.error('Error fetching latest stats', { error });
      throw new AppError('Failed to fetch latest stats', 500);
    }
  }

  async getOverview(): Promise<GetOverviewStatsResponse> {
    try {
      logger.debug('Fetching overview stats');

      const [usersCount, teachersCount, subjectsCount, departmentsCount, classesCount] = await Promise.all([
        statsRepository.countUsers(),
        statsRepository.countTeachers(),
        statsRepository.countSubjects(),
        statsRepository.countDepartments(),
        statsRepository.countClasses(),
      ]);

      return {
        classes: classesCount,
        departments: departmentsCount,
        subjects: subjectsCount,
        teachers: teachersCount,
        users: usersCount,
      };
    } catch (error) {
      logger.error('Error fetching overview stats', { error });
      throw new AppError('Failed to fetch overview stats', 500);
    }
  }
}

export const statsService = new StatsService();
