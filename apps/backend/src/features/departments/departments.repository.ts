import { and, desc, eq, getTableColumns, ilike, or, sql, SQL } from 'drizzle-orm';

import { departments } from '@/features/departments/departments.schema';
import { CreateDepartmentDto, DepartmentWithStats } from '@/features/departments/departments.types';
import { subjects } from '@/features/subjects/subjects.schema';
import { db } from '@/shared/db';
import { logger } from '@/shared/logger';

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
}

export const departmentsRepository = new DepartmentsRepository();
