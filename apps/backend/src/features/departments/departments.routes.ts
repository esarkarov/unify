import express from 'express';

import { departmentsController } from '@/features/departments/departments.controller';
import { departmentsValidation } from '@/features/departments/departments.validation';
import { validate } from '@/shared/middlewares/validation.middleware';

const router = express.Router();

/**
 * @openapi
 * /api/departments:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get all departments
 *     description: Retrieve a paginated list of departments with subject count and optional search filtering
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - $ref: '#/components/parameters/SearchParam'
 *     responses:
 *       200:
 *         description: Successful response with departments list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DepartmentsResponse'
 *             example:
 *               data:
 *                 - id: 1
 *                   code: "CS"
 *                   name: "Computer Science"
 *                   description: "Department of Computer Science"
 *                   totalSubjects: 15
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *                   updatedAt: "2024-01-01T00:00:00.000Z"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 50
 *                 totalPages: 5
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', validate(departmentsValidation.getDepartments), departmentsController.getDepartments);

/**
 * @openapi
 * /api/departments:
 *   post:
 *     tags:
 *       - Departments
 *     summary: Create a new department
 *     description: Create a new department with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDepartment'
 *           example:
 *             name: "Computer Science"
 *             code: "CS"
 *             description: "Department of Computer Science"
 *     responses:
 *       201:
 *         description: Department created successfully
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
router.post('/', validate(departmentsValidation.createDepartment), departmentsController.createDepartment);

/**
 * @openapi
 * /api/departments/{id}:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get department details
 *     description: Retrieve detailed information about a specific department including counts of subjects, classes, and enrolled students
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successful response with department details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     department:
 *                       $ref: '#/components/schemas/Department'
 *                     totals:
 *                       type: object
 *                       properties:
 *                         subjects:
 *                           type: integer
 *                           example: 15
 *                         classes:
 *                           type: integer
 *                           example: 45
 *                         enrolledStudents:
 *                           type: integer
 *                           example: 320
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', validate(departmentsValidation.getDepartment), departmentsController.getDepartment);

export default router;
