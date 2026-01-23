import { and, desc, eq, getTableColumns, ilike, or, sql, SQL } from 'drizzle-orm';

import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import { enrollments } from '@/features/enrollments/enrollments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { db } from '@/shared/db';
import { user } from '@/shared/db/schema/auth.schema';
import { logger } from '@/shared/logger';
import { UserRoles } from '@/shared/types';

class UsersRepository {
  buildWhereClause(search?: string, role?: UserRoles): SQL | undefined {
    const conditions: (SQL | undefined)[] = [];

    if (search) {
      conditions.push(or(ilike(user.name, `%${search}%`), ilike(user.email, `%${search}%`)));
    }

    if (role) {
      conditions.push(eq(user.role, role));
    }

    const validConditions = conditions.filter((c): c is SQL => c !== undefined);
    return validConditions.length > 0 ? and(...validConditions) : undefined;
  }
  async count(whereClause: SQL | undefined): Promise<number> {
    try {
      logger.debug('Repository: Counting users');

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(user)
        .where(whereClause);

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: count', { error });
      throw error;
    }
  }
  async countDepartments(userId: string, role: UserRoles): Promise<number> {
    try {
      logger.debug('Repository: Counting user departments', { role, userId });

      if (role === 'teacher') {
        const result = await db
          .select({ count: sql<number>`count(distinct ${departments.id})` })
          .from(departments)
          .leftJoin(subjects, eq(subjects.departmentId, departments.id))
          .leftJoin(classes, eq(classes.subjectId, subjects.id))
          .where(eq(classes.teacherId, userId));

        return result[0]?.count ?? 0;
      }

      const result = await db
        .select({ count: sql<number>`count(distinct ${departments.id})` })
        .from(departments)
        .leftJoin(subjects, eq(subjects.departmentId, departments.id))
        .leftJoin(classes, eq(classes.subjectId, subjects.id))
        .leftJoin(enrollments, eq(enrollments.classId, classes.id))
        .where(eq(enrollments.studentId, userId));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countDepartments', { error, role, userId });
      throw error;
    }
  }
  async countSubjects(userId: string, role: UserRoles): Promise<number> {
    try {
      logger.debug('Repository: Counting user subjects', { role, userId });

      if (role === 'teacher') {
        const result = await db
          .select({ count: sql<number>`count(distinct ${subjects.id})` })
          .from(subjects)
          .leftJoin(classes, eq(classes.subjectId, subjects.id))
          .where(eq(classes.teacherId, userId));

        return result[0]?.count ?? 0;
      }

      const result = await db
        .select({ count: sql<number>`count(distinct ${subjects.id})` })
        .from(subjects)
        .leftJoin(classes, eq(classes.subjectId, subjects.id))
        .leftJoin(enrollments, eq(enrollments.classId, classes.id))
        .where(eq(enrollments.studentId, userId));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countSubjects', { error, role, userId });
      throw error;
    }
  }
  async findById(id: string) {
    try {
      logger.debug('Repository: Finding user by id', { id });

      const [userRecord] = await db.select().from(user).where(eq(user.id, id));

      return userRecord;
    } catch (error) {
      logger.error('Repository error: findById', { error, id });
      throw error;
    }
  }
  async findDepartments(userId: string, role: UserRoles, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding user departments', { limit, offset, role, userId });

      const groupByFields = [
        departments.id,
        departments.code,
        departments.name,
        departments.description,
        departments.createdAt,
        departments.updatedAt,
      ];

      if (role === 'teacher') {
        return await db
          .select(getTableColumns(departments))
          .from(departments)
          .leftJoin(subjects, eq(subjects.departmentId, departments.id))
          .leftJoin(classes, eq(classes.subjectId, subjects.id))
          .where(eq(classes.teacherId, userId))
          .groupBy(...groupByFields)
          .orderBy(desc(departments.createdAt))
          .limit(limit)
          .offset(offset);
      }

      return await db
        .select(getTableColumns(departments))
        .from(departments)
        .leftJoin(subjects, eq(subjects.departmentId, departments.id))
        .leftJoin(classes, eq(classes.subjectId, subjects.id))
        .leftJoin(enrollments, eq(enrollments.classId, classes.id))
        .where(eq(enrollments.studentId, userId))
        .groupBy(...groupByFields)
        .orderBy(desc(departments.createdAt))
        .limit(limit)
        .offset(offset);
    } catch (error) {
      logger.error('Repository error: findDepartments', { error, role, userId });
      throw error;
    }
  }
  async findMany(whereClause: SQL | undefined, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding users', { limit, offset });

      const usersList = await db
        .select()
        .from(user)
        .where(whereClause)
        .orderBy(desc(user.createdAt))
        .limit(limit)
        .offset(offset);

      return usersList;
    } catch (error) {
      logger.error('Repository error: findMany', { error });
      throw error;
    }
  }
  async findSubjects(userId: string, role: UserRoles, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding user subjects', { limit, offset, role, userId });

      const groupByFields = [
        subjects.id,
        subjects.departmentId,
        subjects.name,
        subjects.code,
        subjects.description,
        subjects.createdAt,
        subjects.updatedAt,
        departments.id,
        departments.code,
        departments.name,
        departments.description,
        departments.createdAt,
        departments.updatedAt,
      ];

      if (role === 'teacher') {
        const subjectsList = await db
          .select({
            ...getTableColumns(subjects),
            department: getTableColumns(departments),
          })
          .from(subjects)
          .innerJoin(departments, eq(subjects.departmentId, departments.id))
          .innerJoin(classes, eq(classes.subjectId, subjects.id))
          .where(eq(classes.teacherId, userId))
          .groupBy(...groupByFields)
          .orderBy(desc(subjects.createdAt))
          .limit(limit)
          .offset(offset);

        return subjectsList.map((item) => ({
          ...item,
          department: item.department.id ? item.department : null,
        }));
      }

      const subjectsList = await db
        .select({
          ...getTableColumns(subjects),
          department: getTableColumns(departments),
        })
        .from(subjects)
        .innerJoin(departments, eq(subjects.departmentId, departments.id))
        .innerJoin(classes, eq(classes.subjectId, subjects.id))
        .innerJoin(enrollments, eq(enrollments.classId, classes.id))
        .where(eq(enrollments.studentId, userId))
        .groupBy(...groupByFields)
        .orderBy(desc(subjects.createdAt))
        .limit(limit)
        .offset(offset);

      return subjectsList.map((item) => ({
        ...item,
        department: item.department.id ? item.department : null,
      }));
    } catch (error) {
      logger.error('Repository error: findSubjects', { error, role, userId });
      throw error;
    }
  }
}

export const usersRepository = new UsersRepository();
