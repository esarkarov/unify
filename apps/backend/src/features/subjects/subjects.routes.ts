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
 *     summary: Get classes by subject
 *     description: Retrieve all classes for a specific subject with pagination
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
 *         description: Classes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       subjectId:
 *                         type: integer
 *                       teacherId:
 *                         type: integer
 *                       teacher:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       400:
 *         description: Invalid subject ID
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
 *     summary: Get users by subject and role
 *     description: Retrieve teachers or students associated with a specific subject
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Subject ID
 *       - in: query
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [teacher, student]
 *         description: User role to filter by
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [teacher, student]
 *                       image:
 *                         type: string
 *                         nullable: true
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *       400:
 *         description: Invalid subject ID or role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Role must be either "teacher" or "student"'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/users', validate(subjectsValidation.getSubjectUsers), subjectsController.getSubjectUsers);

export default router;
