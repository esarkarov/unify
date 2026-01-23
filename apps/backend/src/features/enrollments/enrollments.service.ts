import { enrollmentsRepository } from '@/features/enrollments/enrollments.repository';
import {
  CreateEnrollmentDto,
  GetEnrollmentDetailsResponse,
  JoinClassDto,
} from '@/features/enrollments/enrollments.types';
import { logger } from '@/shared/logger';
import { AppError } from '@/shared/middlewares/error.middleware';

class EnrollmentsService {
  async createEnrollment(dto: CreateEnrollmentDto): Promise<GetEnrollmentDetailsResponse> {
    try {
      logger.debug('Creating enrollment', { dto });

      const classExists = await enrollmentsRepository.verifyClassExists(dto.classId);
      if (!classExists) {
        throw new AppError('Class not found', 404);
      }

      const studentExists = await enrollmentsRepository.verifyStudentExists(dto.studentId);
      if (!studentExists) {
        throw new AppError('Student not found', 404);
      }

      const existingEnrollment = await enrollmentsRepository.findExistingEnrollment(dto.classId, dto.studentId);
      if (existingEnrollment) {
        throw new AppError('Student already enrolled in class', 409);
      }

      const created = await enrollmentsRepository.create(dto);
      if (!created) {
        throw new AppError('Failed to create enrollment', 500);
      }

      const enrollment = await enrollmentsRepository.findById(created.id);
      if (!enrollment) {
        throw new AppError('Failed to retrieve enrollment details', 500);
      }

      return enrollment;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error creating enrollment', { dto, error });
      throw new AppError('Failed to create enrollment', 500);
    }
  }

  async joinClass(dto: JoinClassDto): Promise<GetEnrollmentDetailsResponse> {
    try {
      logger.debug('Student joining class', { dto });

      const classRecord = await enrollmentsRepository.findClassByInviteCode(dto.inviteCode);
      if (!classRecord) {
        throw new AppError('Class not found', 404);
      }

      const studentExists = await enrollmentsRepository.verifyStudentExists(dto.studentId);
      if (!studentExists) {
        throw new AppError('Student not found', 404);
      }

      const existingEnrollment = await enrollmentsRepository.findExistingEnrollment(classRecord.id, dto.studentId);
      if (existingEnrollment) {
        throw new AppError('Student already enrolled in class', 409);
      }

      const created = await enrollmentsRepository.create({
        classId: classRecord.id,
        studentId: dto.studentId,
      });

      if (!created) {
        throw new AppError('Failed to join class', 500);
      }

      const enrollment = await enrollmentsRepository.findById(created.id);
      if (!enrollment) {
        throw new AppError('Failed to retrieve enrollment details', 500);
      }

      return enrollment;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      logger.error('Error joining class', { dto, error });
      throw new AppError('Failed to join class', 500);
    }
  }
}

export const enrollmentsService = new EnrollmentsService();
