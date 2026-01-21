import express from 'express';

import { enrollmentsController } from '@/features/enrollments/enrollments.controller';
import { enrollmentsValidation } from '@/features/enrollments/enrollments.validation';
import { validate } from '@/shared/middlewares/validation.middleware';

const router = express.Router();

/**
 * @openapi
 * /api/enrollments:
 *   post:
 *     tags:
 *       - Enrollments
 *     summary: Create a new enrollment
 *     description: Enroll a student in a class by class ID. This endpoint verifies that both the class and student exist, and checks for duplicate enrollments.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - classId
 *               - studentId
 *             properties:
 *               classId:
 *                 type: integer
 *                 description: ID of the class to enroll in
 *                 example: 1
 *               studentId:
 *                 type: string
 *                 description: ID of the student to enroll
 *                 example: "user_123"
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     classId:
 *                       type: integer
 *                       example: 1
 *                     studentId:
 *                       type: string
 *                       example: "user_123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     class:
 *                       $ref: '#/components/schemas/Class'
 *                     subject:
 *                       $ref: '#/components/schemas/Subject'
 *                     department:
 *                       $ref: '#/components/schemas/Department'
 *                     teacher:
 *                       $ref: '#/components/schemas/User'
 *             example:
 *               data:
 *                 id: 1
 *                 classId: 1
 *                 studentId: "user_123"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *                 class:
 *                   id: 1
 *                   name: "Introduction to Computer Science"
 *                   inviteCode: "abc123"
 *                 subject:
 *                   id: 1
 *                   name: "Computer Science"
 *                   code: "CS101"
 *                 department:
 *                   id: 1
 *                   name: "Computer Science"
 *                   code: "CS"
 *                 teacher:
 *                   id: "user_456"
 *                   name: "Dr. Smith"
 *                   email: "smith@example.com"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         description: Class or student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               classNotFound:
 *                 value:
 *                   error: "Class not found"
 *               studentNotFound:
 *                 value:
 *                   error: "Student not found"
 *       409:
 *         description: Student already enrolled in class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student already enrolled in class"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', validate(enrollmentsValidation.createEnrollment), enrollmentsController.createEnrollment);

/**
 * @openapi
 * /api/enrollments/join:
 *   post:
 *     tags:
 *       - Enrollments
 *     summary: Join a class using invite code
 *     description: Allows a student to self-enroll in a class using the class invite code. This is typically used when students want to join a class independently.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - inviteCode
 *               - studentId
 *             properties:
 *               inviteCode:
 *                 type: string
 *                 description: Invite code of the class to join
 *                 example: "abc123"
 *               studentId:
 *                 type: string
 *                 description: ID of the student joining
 *                 example: "user_123"
 *     responses:
 *       201:
 *         description: Successfully joined class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     classId:
 *                       type: integer
 *                       example: 1
 *                     studentId:
 *                       type: string
 *                       example: "user_123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     class:
 *                       $ref: '#/components/schemas/Class'
 *                     subject:
 *                       $ref: '#/components/schemas/Subject'
 *                     department:
 *                       $ref: '#/components/schemas/Department'
 *                     teacher:
 *                       $ref: '#/components/schemas/User'
 *             example:
 *               data:
 *                 id: 1
 *                 classId: 1
 *                 studentId: "user_123"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *                 class:
 *                   id: 1
 *                   name: "Introduction to Computer Science"
 *                   inviteCode: "abc123"
 *                 subject:
 *                   id: 1
 *                   name: "Computer Science"
 *                   code: "CS101"
 *                 department:
 *                   id: 1
 *                   name: "Computer Science"
 *                   code: "CS"
 *                 teacher:
 *                   id: "user_456"
 *                   name: "Dr. Smith"
 *                   email: "smith@example.com"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         description: Class or student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               classNotFound:
 *                 value:
 *                   error: "Class not found"
 *               studentNotFound:
 *                 value:
 *                   error: "Student not found"
 *       409:
 *         description: Student already enrolled in class
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student already enrolled in class"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/join', validate(enrollmentsValidation.joinClass), enrollmentsController.joinClass);

export default router;
