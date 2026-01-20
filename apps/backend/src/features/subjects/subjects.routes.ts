import { Router } from 'express';

import { subjectsController } from '@/features/subjects/subjects.controller';
import { subjectsValidation } from '@/features/subjects/subjects.validation';
import { validate } from '@/shared/middlewares/validation.middleware';

const router = Router();

/**
 * @openapi
 * /api/subjects:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get all subjects
 *     description: Retrieve a paginated list of subjects with optional search and department filtering
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department name
 *     responses:
 *       200:
 *         description: Successful response with subjects list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubjectsResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', validate(subjectsValidation.getSubjects), subjectsController.getSubjects);

/**
 * @openapi
 * /api/subjects/{id}:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get subject by ID
 *     description: Retrieve detailed information about a specific subject including total classes count
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     subject:
 *                       $ref: '#/components/schemas/Subject'
 *                     totals:
 *                       type: object
 *                       properties:
 *                         classes:
 *                           type: integer
 *                           example: 5
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       400:
 *         description: Invalid subject ID
 */
router.get('/:id', validate(subjectsValidation.getSubject), subjectsController.getSubject);

/**
 * @openapi
 * /api/subjects:
 *   post:
 *     tags:
 *       - Subjects
 *     summary: Create a new subject
 *     description: Create a new subject with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubject'
 *     responses:
 *       201:
 *         description: Subject created successfully
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
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', validate(subjectsValidation.createSubject), subjectsController.createSubject);

/**
 * @openapi
 * /api/subjects/{id}/classes:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get classes for a subject
 *     description: Retrieve a paginated list of classes for a specific subject
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Successful response with classes list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ClassWithTeacher'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "Advanced Algorithms"
 *                   code: "CS301-A"
 *                   description: "Study of advanced algorithmic techniques"
 *                   status: "active"
 *                   capacity: 30
 *                   subjectId: 1
 *                   teacherId: "teacher-123"
 *                   teacher:
 *                     id: "teacher-123"
 *                     name: "Dr. John Smith"
 *                     email: "john.smith@university.edu"
 *                     role: "teacher"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 5
 *                 totalPages: 1
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/classes', validate(subjectsValidation.getSubjectClasses), subjectsController.getSubjectClasses);

/**
 * @openapi
 * /api/subjects/{id}/users:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get users for a subject by role
 *     description: Retrieve a paginated list of teachers or students for a specific subject
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - in: query
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [teacher, student]
 *         description: User role to filter by
 *     responses:
 *       200:
 *         description: Successful response with users list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *             example:
 *               data:
 *                 - id: "user-123"
 *                   name: "Jane Doe"
 *                   email: "jane.doe@university.edu"
 *                   role: "student"
 *                   emailVerified: true
 *                   image: "https://example.com/avatar.jpg"
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *                   updatedAt: "2024-01-01T00:00:00.000Z"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 25
 *                 totalPages: 3
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/users', validate(subjectsValidation.getSubjectUsers), subjectsController.getSubjectUsers);

export default router;
