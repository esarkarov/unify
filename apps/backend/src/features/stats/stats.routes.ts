import express from 'express';

import { statsController } from '@/features/stats/stats.controller';
import { statsValidation } from '@/features/stats/stats.validation';
import { validate } from '@/shared/middlewares/validation.middleware';

const router = express.Router();

/**
 * @openapi
 * /api/stats/overview:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get overview statistics
 *     description: Retrieve count summaries for all core entities in the system including users, teachers, admins, subjects, departments, and classes. Useful for dashboard overview widgets.
 *     responses:
 *       200:
 *         description: Successful response with overview statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: integer
 *                       description: Total number of users
 *                       example: 150
 *                     teachers:
 *                       type: integer
 *                       description: Total number of teachers
 *                       example: 25
 *                     admins:
 *                       type: integer
 *                       description: Total number of admins
 *                       example: 3
 *                     subjects:
 *                       type: integer
 *                       description: Total number of subjects
 *                       example: 45
 *                     departments:
 *                       type: integer
 *                       description: Total number of departments
 *                       example: 8
 *                     classes:
 *                       type: integer
 *                       description: Total number of classes
 *                       example: 120
 *             example:
 *               data:
 *                 users: 150
 *                 teachers: 25
 *                 admins: 3
 *                 subjects: 45
 *                 departments: 8
 *                 classes: 120
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/overview', statsController.getOverview);

/**
 * @openapi
 * /api/stats/latest:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get latest activity
 *     description: Retrieve the most recently created classes and teachers. Useful for showing recent activity on dashboards.
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Maximum number of items to return per category
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 5
 *           example: 5
 *     responses:
 *       200:
 *         description: Successful response with latest activity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     latestClasses:
 *                       type: array
 *                       description: Recently created classes with subject and teacher details
 *                       items:
 *                         allOf:
 *                           - $ref: '#/components/schemas/Class'
 *                           - type: object
 *                             properties:
 *                               subject:
 *                                 $ref: '#/components/schemas/Subject'
 *                               teacher:
 *                                 $ref: '#/components/schemas/User'
 *                     latestTeachers:
 *                       type: array
 *                       description: Recently registered teachers
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *             example:
 *               data:
 *                 latestClasses:
 *                   - id: 1
 *                     name: "Introduction to Computer Science"
 *                     inviteCode: "abc123"
 *                     createdAt: "2024-01-15T10:30:00.000Z"
 *                     subject:
 *                       id: 1
 *                       name: "Computer Science"
 *                       code: "CS101"
 *                     teacher:
 *                       id: "user_123"
 *                       name: "Dr. Smith"
 *                       email: "smith@example.com"
 *                 latestTeachers:
 *                   - id: "user_456"
 *                     name: "Prof. Johnson"
 *                     email: "johnson@example.com"
 *                     role: "teacher"
 *                     createdAt: "2024-01-14T09:00:00.000Z"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/latest', validate(statsValidation.getLatest), statsController.getLatest);

/**
 * @openapi
 * /api/stats/charts:
 *   get:
 *     tags:
 *       - Statistics
 *     summary: Get chart statistics
 *     description: Retrieve aggregated data for visualizations including user distribution by role, subjects per department, and classes per subject. Perfect for generating dashboard charts and graphs.
 *     responses:
 *       200:
 *         description: Successful response with chart data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     usersByRole:
 *                       type: array
 *                       description: Count of users grouped by role
 *                       items:
 *                         type: object
 *                         properties:
 *                           role:
 *                             type: string
 *                             enum: [admin, teacher, student]
 *                             example: "teacher"
 *                           total:
 *                             type: integer
 *                             example: 25
 *                     subjectsByDepartment:
 *                       type: array
 *                       description: Count of subjects grouped by department
 *                       items:
 *                         type: object
 *                         properties:
 *                           departmentId:
 *                             type: integer
 *                             example: 1
 *                           departmentName:
 *                             type: string
 *                             example: "Computer Science"
 *                           totalSubjects:
 *                             type: integer
 *                             example: 15
 *                     classesBySubject:
 *                       type: array
 *                       description: Count of classes grouped by subject
 *                       items:
 *                         type: object
 *                         properties:
 *                           subjectId:
 *                             type: integer
 *                             example: 1
 *                           subjectName:
 *                             type: string
 *                             example: "Data Structures"
 *                           totalClasses:
 *                             type: integer
 *                             example: 5
 *             example:
 *               data:
 *                 usersByRole:
 *                   - role: "admin"
 *                     total: 3
 *                   - role: "teacher"
 *                     total: 25
 *                   - role: "student"
 *                     total: 122
 *                 subjectsByDepartment:
 *                   - departmentId: 1
 *                     departmentName: "Computer Science"
 *                     totalSubjects: 15
 *                   - departmentId: 2
 *                     departmentName: "Mathematics"
 *                     totalSubjects: 12
 *                 classesBySubject:
 *                   - subjectId: 1
 *                     subjectName: "Data Structures"
 *                     totalClasses: 5
 *                   - subjectId: 2
 *                     subjectName: "Algorithms"
 *                     totalClasses: 4
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/charts', statsController.getCharts);

export default router;
