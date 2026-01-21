import express from 'express';

import { usersController } from '@/features/users/users.controller';
import { usersValidation } from '@/features/users/users.validation';
import { validate } from '@/shared/middlewares/validation.middleware';

const router = express.Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a paginated list of users with optional search and role filtering
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: search
 *         in: query
 *         description: Search by user name or email
 *         schema:
 *           type: string
 *           example: "john"
 *       - name: role
 *         in: query
 *         description: Filter by user role
 *         schema:
 *           type: string
 *           enum: [teacher, student]
 *           example: "teacher"
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
 *                 - id: "user_123"
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   role: "teacher"
 *                   emailVerified: true
 *                   image: null
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
router.get('/', validate(usersValidation.getUsers), usersController.getUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user details
 *     description: Retrieve detailed information about a specific user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: "user_123"
 *     responses:
 *       200:
 *         description: Successful response with user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *             example:
 *               data:
 *                 id: "user_123"
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 role: "teacher"
 *                 emailVerified: true
 *                 image: "https://example.com/avatar.jpg"
 *                 imageCldPubId: "users/avatar_123"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *                 updatedAt: "2024-01-01T00:00:00.000Z"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', validate(usersValidation.getUser), usersController.getUser);

/**
 * @openapi
 * /api/users/{id}/departments:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user's departments
 *     description: Retrieve a paginated list of departments associated with a user. For teachers, returns departments where they teach classes. For students, returns departments where they're enrolled in classes. Returns empty list for admin users.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: "user_123"
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *     responses:
 *       200:
 *         description: Successful response with departments list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Department'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *             example:
 *               data:
 *                 - id: 1
 *                   code: "CS"
 *                   name: "Computer Science"
 *                   description: "Department of Computer Science"
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *                   updatedAt: "2024-01-01T00:00:00.000Z"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 3
 *                 totalPages: 1
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/departments', validate(usersValidation.getUserDepartments), usersController.getUserDepartments);

/**
 * @openapi
 * /api/users/{id}/subjects:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user's subjects
 *     description: Retrieve a paginated list of subjects associated with a user. For teachers, returns subjects they teach. For students, returns subjects they're enrolled in. Returns empty list for admin users. Each subject includes its department information.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: "user_123"
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
 *                     allOf:
 *                       - $ref: '#/components/schemas/Subject'
 *                       - type: object
 *                         properties:
 *                           department:
 *                             $ref: '#/components/schemas/Department'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *             example:
 *               data:
 *                 - id: 1
 *                   code: "CS101"
 *                   name: "Introduction to Computer Science"
 *                   description: "Fundamentals of CS"
 *                   departmentId: 1
 *                   createdAt: "2024-01-01T00:00:00.000Z"
 *                   updatedAt: "2024-01-01T00:00:00.000Z"
 *                   department:
 *                     id: 1
 *                     code: "CS"
 *                     name: "Computer Science"
 *                     description: "Department of Computer Science"
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
router.get('/:id/subjects', validate(usersValidation.getUserSubjects), usersController.getUserSubjects);

export default router;
