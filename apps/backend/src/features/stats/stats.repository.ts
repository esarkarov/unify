import { desc, eq, getTableColumns, sql } from 'drizzle-orm';

import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { db } from '@/shared/db';
import { user } from '@/shared/db/schema/auth.schema';
import { logger } from '@/shared/logger';

class StatsRepository {
  async aggregateClassesBySubject() {
    try {
      logger.debug('Repository: Aggregating classes by subject');

      const classesBySubject = await db
        .select({
          subjectId: subjects.id,
          subjectName: subjects.name,
          totalClasses: sql<number>`count(${classes.id})`,
        })
        .from(subjects)
        .leftJoin(classes, eq(classes.subjectId, subjects.id))
        .groupBy(subjects.id, subjects.name);

      return classesBySubject;
    } catch (error) {
      logger.error('Repository error: aggregateClassesBySubject', { error });
      throw error;
    }
  }

  async aggregateSubjectsByDepartment() {
    try {
      logger.debug('Repository: Aggregating subjects by department');

      const subjectsByDepartment = await db
        .select({
          departmentId: departments.id,
          departmentName: departments.name,
          totalSubjects: sql<number>`count(${subjects.id})`,
        })
        .from(departments)
        .leftJoin(subjects, eq(subjects.departmentId, departments.id))
        .groupBy(departments.id, departments.name);

      return subjectsByDepartment;
    } catch (error) {
      logger.error('Repository error: aggregateSubjectsByDepartment', { error });
      throw error;
    }
  }

  async aggregateUsersByRole() {
    try {
      logger.debug('Repository: Aggregating users by role');

      const usersByRole = await db
        .select({
          role: user.role,
          total: sql<number>`count(*)`,
        })
        .from(user)
        .groupBy(user.role);

      return usersByRole;
    } catch (error) {
      logger.error('Repository error: aggregateUsersByRole', { error });
      throw error;
    }
  }

  async countClasses(): Promise<number> {
    try {
      logger.debug('Repository: Counting classes');

      const result = await db.select({ count: sql<number>`count(*)` }).from(classes);

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countClasses', { error });
      throw error;
    }
  }

  async countDepartments(): Promise<number> {
    try {
      logger.debug('Repository: Counting departments');

      const result = await db.select({ count: sql<number>`count(*)` }).from(departments);

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countDepartments', { error });
      throw error;
    }
  }

  async countSubjects(): Promise<number> {
    try {
      logger.debug('Repository: Counting subjects');

      const result = await db.select({ count: sql<number>`count(*)` }).from(subjects);

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countSubjects', { error });
      throw error;
    }
  }

  async countTeachers(): Promise<number> {
    try {
      logger.debug('Repository: Counting teachers');

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(user)
        .where(eq(user.role, 'teacher'));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countTeachers', { error });
      throw error;
    }
  }

  async countUsers(): Promise<number> {
    try {
      logger.debug('Repository: Counting users');

      const result = await db.select({ count: sql<number>`count(*)` }).from(user);

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countUsers', { error });
      throw error;
    }
  }

  async findLatestClasses(limit: number) {
    try {
      logger.debug('Repository: Finding latest classes', { limit });

      const latestClasses = await db
        .select({
          ...getTableColumns(classes),
          subject: getTableColumns(subjects),
          teacher: getTableColumns(user),
        })
        .from(classes)
        .innerJoin(subjects, eq(classes.subjectId, subjects.id))
        .innerJoin(user, eq(classes.teacherId, user.id))
        .orderBy(desc(classes.createdAt))
        .limit(limit);

      return latestClasses.map((item) => ({
        ...item,
        subject: item.subject.id ? item.subject : null,
        teacher: item.teacher.id ? item.teacher : null,
      }));
    } catch (error) {
      logger.error('Repository error: findLatestClasses', { error, limit });
      throw error;
    }
  }

  async findLatestTeachers(limit: number) {
    try {
      logger.debug('Repository: Finding latest teachers', { limit });

      const latestTeachers = await db
        .select()
        .from(user)
        .where(eq(user.role, 'teacher'))
        .orderBy(desc(user.createdAt))
        .limit(limit);

      return latestTeachers;
    } catch (error) {
      logger.error('Repository error: findLatestTeachers', { error, limit });
      throw error;
    }
  }
}

export const statsRepository = new StatsRepository();
