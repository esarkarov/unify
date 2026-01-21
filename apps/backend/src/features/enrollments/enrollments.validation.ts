import { z } from 'zod';

export const createEnrollmentBodySchema = z.object({
  classId: z.number().int().positive('Invalid class ID'),
  studentId: z.string().trim().min(1, 'Student ID is required'),
});

export const joinClassBodySchema = z.object({
  inviteCode: z.string().trim().min(1, 'Invite code is required'),
  studentId: z.string().trim().min(1, 'Student ID is required'),
});

export const enrollmentsValidation = {
  createEnrollment: {
    body: createEnrollmentBodySchema,
  },

  joinClass: {
    body: joinClassBodySchema,
  },
};
