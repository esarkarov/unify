import { and, eq, getTableColumns } from 'drizzle-orm';

import { classes } from '@/features/classes/classes.schema';
import { departments } from '@/features/departments/departments.schema';
import { enrollments } from '@/features/enrollments/enrollments.schema';
import { CreateEnrollmentDto } from '@/features/enrollments/enrollments.types';
import { subjects } from '@/features/subjects/subjects.schema';
import { db } from '@/shared/db';
import { user } from '@/shared/db/schema/auth.schema';
import { logger } from '@/shared/logger';

class EnrollmentsRepository {
  async create(data: CreateEnrollmentDto) {
    try {
      logger.debug('Repository: Creating enrollment', { data });

      const [created] = await db.insert(enrollments).values(data).returning({ id: enrollments.id });

      return created;
    } catch (error) {
      logger.error('Repository error: create', { data, error });
      throw error;
    }
  }

  async findById(id: number) {
    try {
      logger.debug('Repository: Finding enrollment by id', { id });

      const [enrollment] = await db
        .select({
          ...getTableColumns(enrollments),
          class: getTableColumns(classes),
          department: getTableColumns(departments),
          subject: getTableColumns(subjects),
          teacher: getTableColumns(user),
        })
        .from(enrollments)
        .innerJoin(classes, eq(enrollments.classId, classes.id))
        .innerJoin(subjects, eq(classes.subjectId, subjects.id))
        .innerJoin(departments, eq(subjects.departmentId, departments.id))
        .innerJoin(user, eq(classes.teacherId, user.id))
        .where(eq(enrollments.id, id));

      if (!enrollment) {
        return null;
      }

      return {
        ...enrollment,
        class: enrollment.class.id ? enrollment.class : null,
        department: enrollment.department.id ? enrollment.department : null,
        subject: enrollment.subject.id ? enrollment.subject : null,
        teacher: enrollment.teacher.id ? enrollment.teacher : null,
      };
    } catch (error) {
      logger.error('Repository error: findById', { error, id });
      throw error;
    }
  }

  async findClassByInviteCode(inviteCode: string) {
    try {
      logger.debug('Repository: Finding class by invite code', { inviteCode });

      const [classRecord] = await db.select({ id: classes.id }).from(classes).where(eq(classes.inviteCode, inviteCode));

      return classRecord;
    } catch (error) {
      logger.error('Repository error: findClassByInviteCode', { error, inviteCode });
      throw error;
    }
  }

  async findExistingEnrollment(classId: number, studentId: string) {
    try {
      logger.debug('Repository: Finding existing enrollment', { classId, studentId });

      const [existingEnrollment] = await db
        .select({ id: enrollments.id })
        .from(enrollments)
        .where(and(eq(enrollments.classId, classId), eq(enrollments.studentId, studentId)));

      return existingEnrollment;
    } catch (error) {
      logger.error('Repository error: findExistingEnrollment', { classId, error, studentId });
      throw error;
    }
  }

  async verifyClassExists(classId: number): Promise<boolean> {
    try {
      logger.debug('Repository: Verifying class exists', { classId });

      const [classRecord] = await db.select({ id: classes.id }).from(classes).where(eq(classes.id, classId));

      return !!classRecord;
    } catch (error) {
      logger.error('Repository error: verifyClassExists', { classId, error });
      throw error;
    }
  }

  async verifyStudentExists(studentId: string): Promise<boolean> {
    try {
      logger.debug('Repository: Verifying student exists', { studentId });

      const [student] = await db.select({ id: user.id }).from(user).where(eq(user.id, studentId));

      return !!student;
    } catch (error) {
      logger.error('Repository error: verifyStudentExists', { error, studentId });
      throw error;
    }
  }
}

export const enrollmentsRepository = new EnrollmentsRepository();
