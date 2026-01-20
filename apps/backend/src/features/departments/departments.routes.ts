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

/**
 * @openapi
 * /api/departments/{id}/subjects:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get subjects in a department
 *     description: Retrieve a paginated list of subjects belonging to a specific department
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Successful response with subjects list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subject'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "Data Structures"
 *                   code: "CS101"
 *                   departmentId: 1
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *                   updatedAt: "2024-01-01T00:00:00.000Z"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 15
 *                 totalPages: 2
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  '/:id/subjects',
  validate(departmentsValidation.getDepartmentSubjects),
  departmentsController.getDepartmentSubjects
);

/**
 * @openapi
 * /api/departments/{id}/classes:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get classes in a department
 *     description: Retrieve a paginated list of classes belonging to a specific department, including subject and teacher information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *           example: 1
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
 *                     allOf:
 *                       - $ref: '#/components/schemas/Class'
 *                       - type: object
 *                         properties:
 *                           subject:
 *                             $ref: '#/components/schemas/Subject'
 *                           teacher:
 *                             $ref: '#/components/schemas/User'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  '/:id/classes',
  validate(departmentsValidation.getDepartmentClasses),
  departmentsController.getDepartmentClasses
);

/**
 * @openapi
 * /api/departments/{id}/users:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get users in a department by role
 *     description: Retrieve a paginated list of teachers or students associated with a specific department
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: role
 *         in: query
 *         required: true
 *         description: User role to filter by
 *         schema:
 *           type: string
 *           enum: [teacher, student, admin]
 *           example: student
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
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
 *                   $ref: '#/components/schemas/Pagination'
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   role: "student"
 *                   emailVerified: true
 *                   image: null
 *                   imageCldPubId: null
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *                   updatedAt: "2024-01-01T00:00:00.000Z"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 320
 *                 totalPages: 32
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/users', validate(departmentsValidation.getDepartmentUsers), departmentsController.getDepartmentUsers);

export default router;
