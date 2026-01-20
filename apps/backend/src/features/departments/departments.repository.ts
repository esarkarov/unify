import { and, desc, eq, getTableColumns, ilike, or, sql, SQL } from 'drizzle-orm';

import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import { CreateDepartmentDto, DepartmentWithStats } from '@/features/departments/departments.types';
import { enrollments } from '@/features/enrollments/enrollments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { db } from '@/shared/db';
import { user } from '@/shared/db/schema/auth.schema';
import { logger } from '@/shared/logger';
import { UserRoles } from '@/shared/types';

class DepartmentsRepository {
  buildWhereClause(search?: string): SQL | undefined {
    const conditions: (SQL | undefined)[] = [];

    if (search) {
      conditions.push(or(ilike(departments.name, `%${search}%`), ilike(departments.code, `%${search}%`)));
    }

    const validConditions = conditions.filter((c): c is SQL => c !== undefined);
    return validConditions.length > 0 ? and(...validConditions) : undefined;
  }
  async count(whereClause: SQL | undefined): Promise<number> {
    try {
      logger.debug('Repository: Counting departments');

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(departments)
        .where(whereClause);

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: count', { error });
      throw error;
    }
  }
  async countClasses(departmentId: number): Promise<number> {
    try {
      logger.debug('Repository: Counting department classes', { departmentId });

      const result = await db
        .select({ count: sql<number>`count(${classes.id})` })
        .from(classes)
        .leftJoin(subjects, eq(classes.subjectId, subjects.id))
        .where(eq(subjects.departmentId, departmentId));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countClasses', { departmentId, error });
      throw error;
    }
  }
  async countEnrolledStudents(departmentId: number): Promise<number> {
    try {
      logger.debug('Repository: Counting enrolled students', { departmentId });

      const result = await db
        .select({ count: sql<number>`count(distinct ${user.id})` })
        .from(user)
        .leftJoin(enrollments, eq(user.id, enrollments.studentId))
        .leftJoin(classes, eq(enrollments.classId, classes.id))
        .leftJoin(subjects, eq(classes.subjectId, subjects.id))
        .where(and(eq(user.role, 'student'), eq(subjects.departmentId, departmentId)));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countEnrolledStudents', { departmentId, error });
      throw error;
    }
  }
  async countSubjects(departmentId: number): Promise<number> {
    try {
      logger.debug('Repository: Counting department subjects', { departmentId });

      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(subjects)
        .where(eq(subjects.departmentId, departmentId));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countSubjects', { departmentId, error });
      throw error;
    }
  }
  async countUsers(departmentId: number, role: UserRoles): Promise<number> {
    try {
      logger.debug('Repository: Counting department users', { departmentId, role });

      if (role === 'teacher') {
        const result = await db
          .select({ count: sql<number>`count(distinct ${user.id})` })
          .from(user)
          .leftJoin(classes, eq(user.id, classes.teacherId))
          .leftJoin(subjects, eq(classes.subjectId, subjects.id))
          .where(and(eq(user.role, role), eq(subjects.departmentId, departmentId)));

        return result[0]?.count ?? 0;
      }

      const result = await db
        .select({ count: sql<number>`count(distinct ${user.id})` })
        .from(user)
        .leftJoin(enrollments, eq(user.id, enrollments.studentId))
        .leftJoin(classes, eq(enrollments.classId, classes.id))
        .leftJoin(subjects, eq(classes.subjectId, subjects.id))
        .where(and(eq(user.role, role), eq(subjects.departmentId, departmentId)));

      return result[0]?.count ?? 0;
    } catch (error) {
      logger.error('Repository error: countUsers', { departmentId, error, role });
      throw error;
    }
  }
  async create(data: CreateDepartmentDto) {
    try {
      logger.debug('Repository: Creating department', { data });

      const [created] = await db.insert(departments).values(data).returning({ id: departments.id });

      return created;
    } catch (error) {
      logger.error('Repository error: create', { data, error });
      throw error;
    }
  }
  async findById(id: number) {
    try {
      logger.debug('Repository: Finding department by id', { id });

      const [department] = await db.select().from(departments).where(eq(departments.id, id));

      return department;
    } catch (error) {
      logger.error('Repository error: findById', { error, id });
      throw error;
    }
  }
  async findClasses(departmentId: number, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding department classes', { departmentId, limit, offset });

      const classesList = await db
        .select({
          ...getTableColumns(classes),
          subject: getTableColumns(subjects),
          teacher: getTableColumns(user),
        })
        .from(classes)
        .innerJoin(subjects, eq(classes.subjectId, subjects.id))
        .innerJoin(user, eq(classes.teacherId, user.id))
        .where(eq(subjects.departmentId, departmentId))
        .orderBy(desc(classes.createdAt))
        .limit(limit)
        .offset(offset);

      return classesList.map((item) => ({
        ...item,
        subject: item.subject.id ? item.subject : null,
        teacher: item.teacher.id ? item.teacher : null,
      }));
    } catch (error) {
      logger.error('Repository error: findClasses', { departmentId, error });
      throw error;
    }
  }
  async findMany(whereClause: SQL | undefined, limit: number, offset: number): Promise<DepartmentWithStats[]> {
    try {
      logger.debug('Repository: Finding departments', { limit, offset });

      const results = await db
        .select({
          ...getTableColumns(departments),
          totalSubjects: sql<number>`count(${subjects.id})`,
        })
        .from(departments)
        .leftJoin(subjects, eq(departments.id, subjects.departmentId))
        .where(whereClause)
        .groupBy(departments.id)
        .orderBy(desc(departments.createdAt))
        .limit(limit)
        .offset(offset);

      return results;
    } catch (error) {
      logger.error('Repository error: findMany', { error });
      throw error;
    }
  }
  async findSubjects(departmentId: number, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding department subjects', { departmentId, limit, offset });

      const subjectsList = await db
        .select(getTableColumns(subjects))
        .from(subjects)
        .where(eq(subjects.departmentId, departmentId))
        .orderBy(desc(subjects.createdAt))
        .limit(limit)
        .offset(offset);

      return subjectsList;
    } catch (error) {
      logger.error('Repository error: findSubjects', { departmentId, error });
      throw error;
    }
  }
  async findUsers(departmentId: number, role: UserRoles, limit: number, offset: number) {
    try {
      logger.debug('Repository: Finding department users', { departmentId, limit, offset, role });

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
          .leftJoin(subjects, eq(classes.subjectId, subjects.id))
          .where(and(eq(user.role, role), eq(subjects.departmentId, departmentId)))
          .groupBy(...groupByFields)
          .orderBy(desc(user.createdAt))
          .limit(limit)
          .offset(offset);
      }

      return await db
        .select(baseSelect)
        .from(user)
        .leftJoin(enrollments, eq(user.id, enrollments.studentId))
        .leftJoin(classes, eq(enrollments.classId, classes.id))
        .leftJoin(subjects, eq(classes.subjectId, subjects.id))
        .where(and(eq(user.role, role), eq(subjects.departmentId, departmentId)))
        .groupBy(...groupByFields)
        .orderBy(desc(user.createdAt))
        .limit(limit)
        .offset(offset);
    } catch (error) {
      logger.error('Repository error: findUsers', { departmentId, error, role });
      throw error;
    }
  }
}

export const departmentsRepository = new DepartmentsRepository();
