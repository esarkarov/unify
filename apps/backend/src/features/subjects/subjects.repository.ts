import { and, desc, eq, getTableColumns, ilike, or, sql, SQL } from 'drizzle-orm';

import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import { enrollments } from '@/features/enrollments/enrollments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { CreateSubjectDto, SubjectWithDepartment } from '@/features/subjects/subjects.types';
import { db } from '@/shared/db';
import { user } from '@/shared/db/schema/auth.schema';
import { logger } from '@/shared/logger';
import { UserRoles } from '@/shared/types';

class SubjectsRepository {
  buildWhereClause(search?: string, department?: string): SQL | undefined {
    const conditions: (SQL | undefined)[] = [];

    if (search) {
      conditions.push(or(ilike(subjects.name, `%${search}%`), ilike(subjects.code, `%${search}%`)));
    }

    if (department) {
      conditions.push(ilike(departments.name, `%${department}%`));
    }

    const validConditions = conditions.filter((c): c is SQL => c !== undefined);
    return validConditions.length > 0 ? and(...validConditions) : undefined;
  }

  async count(whereClause: SQL | undefined): Promise<number> {
    try {
      logger.debug('Repository: Counting subjects');

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(subjects)
        .leftJoin(departments, eq(subjects.departmentId, departments.id))
        .where(whereClause);

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: count', { error });
      throw error;
    }
  }

  async countClasses(subjectId: number): Promise<number> {
    try {
      logger.debug('Repository: Counting classes', { subjectId });

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(classes)
        .where(eq(classes.subjectId, subjectId));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countClasses', { error, subjectId });
      throw error;
    }
  }

  async countUsers(subjectId: number, role: UserRoles): Promise<number> {
    try {
      logger.debug('Repository: Counting users', { role, subjectId });

      let result;

      if (role === 'teacher') {
        result = await db
          .select({ count: sql<number>`count(distinct ${user.id})` })
          .from(user)
          .leftJoin(classes, eq(user.id, classes.teacherId))
          .where(and(eq(user.role, role), eq(classes.subjectId, subjectId)));
      } else {
        result = await db
          .select({ count: sql<number>`count(distinct ${user.id})` })
          .from(user)
          .leftJoin(enrollments, eq(user.id, enrollments.studentId))
          .leftJoin(classes, eq(enrollments.classId, classes.id))
          .where(and(eq(user.role, role), eq(classes.subjectId, subjectId)));
      }

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countUsers', { error, role, subjectId });
      throw error;
    }
  }

  async create(data: CreateSubjectDto) {
    try {
      logger.debug('Repository: Creating subject', { data });

      const [created] = await db.insert(subjects).values(data).returning({ id: subjects.id });

      return created;
    } catch (error) {
      logger.error('Repository error: create', { data, error });
      throw error;
    }
  }

  async findById(subjectId: number) {
    try {
      logger.debug('Repository: Finding subject by ID', { subjectId });

      const [subject] = await db
        .select({
          ...getTableColumns(subjects),
          department: {
            ...getTableColumns(departments),
          },
        })
        .from(subjects)
        .leftJoin(departments, eq(subjects.departmentId, departments.id))
        .where(eq(subjects.id, subjectId));

      return subject || null;
    } catch (error) {
      logger.error('Repository error: findById', { error, subjectId });
      throw error;
    }
  }

  async findClassesBySubject(subjectId: number, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding classes by subject', { limit, offset, subjectId });

      const classesList = await db
        .select({
          ...getTableColumns(classes),
          teacher: {
            ...getTableColumns(user),
          },
        })
        .from(classes)
        .leftJoin(user, eq(classes.teacherId, user.id))
        .where(eq(classes.subjectId, subjectId))
        .orderBy(desc(classes.createdAt))
        .limit(limit)
        .offset(offset);

      return classesList;
    } catch (error) {
      logger.error('Repository error: findClassesBySubject', { error, subjectId });
      throw error;
    }
  }

  async findMany(whereClause: SQL | undefined, limit: number, offset: number): Promise<SubjectWithDepartment[]> {
    try {
      logger.debug('Repository: Finding subjects', { limit, offset });

      const results = await db
        .select({
          ...getTableColumns(subjects),
          department: {
            ...getTableColumns(departments),
          },
        })
        .from(subjects)
        .leftJoin(departments, eq(subjects.departmentId, departments.id))
        .where(whereClause)
        .orderBy(desc(subjects.createdAt))
        .limit(limit)
        .offset(offset);

      return results;
    } catch (error) {
      logger.error('Repository error: findMany', { error });
      throw error;
    }
  }

  async findUsersBySubject(subjectId: number, role: UserRoles, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding users by subject', { limit, offset, role, subjectId });

      const baseSelect = {
        createdAt: user.createdAt,
        email: user.email,
        emailVerified: user.emailVerified,
        id: user.id,
        image: user.image,
        imageCldPubId: user.imageCldPubId,
        name: user.name,
        role: user.role,
        updatedAt: user.updatedAt,
      };

      const groupByFields = [
        user.id,
        user.name,
        user.email,
        user.emailVerified,
        user.image,
        user.role,
        user.imageCldPubId,
        user.createdAt,
        user.updatedAt,
      ];

      if (role === 'teacher') {
        return await db
          .select(baseSelect)
          .from(user)
          .leftJoin(classes, eq(user.id, classes.teacherId))
          .where(and(eq(user.role, role), eq(classes.subjectId, subjectId)))
          .groupBy(...groupByFields)
          .orderBy(desc(user.createdAt))
          .limit(limit)
          .offset(offset);
      } else {
        return await db
          .select(baseSelect)
          .from(user)
          .leftJoin(enrollments, eq(user.id, enrollments.studentId))
          .leftJoin(classes, eq(enrollments.classId, classes.id))
          .where(and(eq(user.role, role), eq(classes.subjectId, subjectId)))
          .groupBy(...groupByFields)
          .orderBy(desc(user.createdAt))
          .limit(limit)
          .offset(offset);
      }
    } catch (error) {
      logger.error('Repository error: findUsersBySubject', { error, role, subjectId });
      throw error;
    }
  }
}

export const subjectsRepository = new SubjectsRepository();
