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

export default router;
