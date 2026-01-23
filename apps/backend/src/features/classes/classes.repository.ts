import { and, desc, eq, getTableColumns, ilike, or, sql, SQL } from 'drizzle-orm';

import { classes } from '@/features/classes/classes.schema';
import { CreateClassDto } from '@/features/classes/classes.types';
import { departments } from '@/features/departments/departments.schema';
import { enrollments } from '@/features/enrollments/enrollments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { db } from '@/shared/db';
import { user } from '@/shared/db/schema/auth.schema';
import { logger } from '@/shared/logger';
import { UserRoles } from '@/shared/types';

class ClassesRepository {
  buildWhereClause(search?: string, subject?: string, teacher?: string): SQL | undefined {
    const conditions: (SQL | undefined)[] = [];

    if (search) {
      conditions.push(or(ilike(classes.name, `%${search}%`), ilike(classes.inviteCode, `%${search}%`)));
    }

    if (subject) {
      conditions.push(ilike(subjects.name, `%${subject}%`));
    }

    if (teacher) {
      conditions.push(ilike(user.name, `%${teacher}%`));
    }

    const validConditions = conditions.filter((c): c is SQL => c !== undefined);
    return validConditions.length > 0 ? and(...validConditions) : undefined;
  }
  async count(whereClause: SQL | undefined): Promise<number> {
    try {
      logger.debug('Repository: Counting classes');

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(classes)
        .leftJoin(subjects, eq(classes.subjectId, subjects.id))
        .leftJoin(user, eq(classes.teacherId, user.id))
        .where(whereClause);

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: count', { error });
      throw error;
    }
  }
  async countUsers(classId: number, role: UserRoles): Promise<number> {
    try {
      logger.debug('Repository: Counting class users', { classId, role });

      if (role === 'teacher') {
        const result = await db
          .select({ count: sql<number>`count(distinct ${user.id})` })
          .from(user)
          .leftJoin(classes, eq(user.id, classes.teacherId))
          .where(and(eq(user.role, role), eq(classes.id, classId)));

        return result[0]?.count ?? 0;
      }

      const result = await db
        .select({ count: sql<number>`count(distinct ${user.id})` })
        .from(user)
        .leftJoin(enrollments, eq(user.id, enrollments.studentId))
        .where(and(eq(user.role, role), eq(enrollments.classId, classId)));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countUsers', { classId, error, role });
      throw error;
    }
  }
  async create(data: CreateClassDto & { inviteCode: string }) {
    try {
      logger.debug('Repository: Creating class', { data });

      const [created] = await db
        .insert(classes)
        .values({
          ...data,
          schedules: data.schedules || [],
        })
        .returning({ id: classes.id });

      return created;
    } catch (error) {
      logger.error('Repository error: create', { data, error });
      throw error;
    }
  }
  async findById(id: number) {
    try {
      logger.debug('Repository: Finding class by id', { id });

      const [classDetails] = await db
        .select({
          ...getTableColumns(classes),
          department: getTableColumns(departments),
          subject: getTableColumns(subjects),
          teacher: getTableColumns(user),
        })
        .from(classes)
        .innerJoin(subjects, eq(classes.subjectId, subjects.id))
        .innerJoin(departments, eq(subjects.departmentId, departments.id))
        .innerJoin(user, eq(classes.teacherId, user.id))
        .where(eq(classes.id, id));

      if (!classDetails) {
        return null;
      }

      return {
        ...classDetails,
        department: classDetails.department.id ? classDetails.department : null,
        subject: classDetails.subject.id ? classDetails.subject : null,
        teacher: classDetails.teacher.id ? classDetails.teacher : null,
      };
    } catch (error) {
      logger.error('Repository error: findById', { error, id });
      throw error;
    }
  }
  async findMany(whereClause: SQL | undefined, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding classes', { limit, offset });

      const classesList = await db
        .select({
          ...getTableColumns(classes),
          subject: getTableColumns(subjects),
          teacher: getTableColumns(user),
        })
        .from(classes)
        .innerJoin(subjects, eq(classes.subjectId, subjects.id))
        .innerJoin(user, eq(classes.teacherId, user.id))
        .where(whereClause)
        .orderBy(desc(classes.createdAt))
        .limit(limit)
        .offset(offset);

      return classesList.map((item) => ({
        ...item,
        subject: item.subject.id ? item.subject : null,
        teacher: item.teacher.id ? item.teacher : null,
      }));
    } catch (error) {
      logger.error('Repository error: findMany', { error });
      throw error;
    }
  }
  async findUsers(classId: number, role: UserRoles, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding class users', { classId, limit, offset, role });

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
          .where(and(eq(user.role, role), eq(classes.id, classId)))
          .groupBy(...groupByFields)
          .orderBy(desc(user.createdAt))
          .limit(limit)
          .offset(offset);
      }

      return await db
        .select(baseSelect)
        .from(user)
        .leftJoin(enrollments, eq(user.id, enrollments.studentId))
        .where(and(eq(user.role, role), eq(enrollments.classId, classId)))
        .groupBy(...groupByFields)
        .orderBy(desc(user.createdAt))
        .limit(limit)
        .offset(offset);
    } catch (error) {
      logger.error('Repository error: findUsers', { classId, error, role });
      throw error;
    }
  }
}

export const classesRepository = new ClassesRepository();
