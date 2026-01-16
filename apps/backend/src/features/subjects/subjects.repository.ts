import { departments } from '@/features/departments/departments.schema';
import { subjects } from '@/features/subjects/subjects.schema';
import { CreateSubjectDto, SubjectWithDepartment } from '@/features/subjects/subjects.types';
import { db } from '@/shared/db';
import { logger } from '@/shared/logger';
import { and, desc, eq, getTableColumns, ilike, or, sql, SQL } from 'drizzle-orm';

class SubjectsRepository {
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

  async create(data: CreateSubjectDto) {
    try {
      logger.debug('Repository: Creating subject', { data });

      const [created] = await db.insert(subjects).values(data).returning({ id: subjects.id });

      return created;
    } catch (error) {
      logger.error('Repository error: create', { error, data });
      throw error;
    }
  }

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
}

export const subjectsRepository = new SubjectsRepository();
