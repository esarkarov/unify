import express from 'express';

import { classesController } from '@/features/classes/classes.controller';
import { classesValidation } from '@/features/classes/classes.validation';
import { validate } from '@/shared/middlewares/validation.middleware';

const router = express.Router();

/**
 * @openapi
 * /api/classes:
 *   get:
 *     tags:
 *       - Classes
 *     summary: Get all classes
 *     description: Retrieve a paginated list of classes with optional search and filter capabilities
 *     parameters:
 *       - $ref: '#/components/parameters/PageParam'
 *       - $ref: '#/components/parameters/LimitParam'
 *       - name: search
 *         in: query
 *         description: Search by class name or invite code
 *         schema:
 *           type: string
 *           example: "Introduction"
 *       - name: subject
 *         in: query
 *         description: Filter by subject name
 *         schema:
 *           type: string
 *           example: "Mathematics"
 *       - name: teacher
 *         in: query
 *         description: Filter by teacher name
 *         schema:
 *           type: string
 *           example: "John Doe"
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
 *             example:
 *               data:
 *                 - id: 1
 *                   name: "Introduction to Computer Science"
 *                   description: "Fundamentals of CS"
 *                   inviteCode: "abc123"
 *                   capacity: 50
 *                   status: "active"
 *                   subject:
 *                     id: 1
 *                     name: "Computer Science"
 *                   teacher:
 *                     id: "user_123"
 *                     name: "Dr. Smith"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 25
 *                 totalPages: 3
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', validate(classesValidation.getClasses), classesController.getClasses);

/**
 * @openapi
 * /api/classes:
 *   post:
 *     tags:
 *       - Classes
 *     summary: Create a new class
 *     description: Create a new class with the provided details. An invite code will be automatically generated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - subjectId
 *               - teacherId
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Introduction to Computer Science"
 *               description:
 *                 type: string
 *                 example: "Learn the fundamentals of computer science"
 *               subjectId:
 *                 type: integer
 *                 example: 1
 *               teacherId:
 *                 type: string
 *                 example: "user_123"
 *               capacity:
 *                 type: integer
 *                 default: 50
 *                 example: 30
 *               status:
 *                 type: string
 *                 enum: [active, inactive, archived]
 *                 default: active
 *                 example: "active"
 *               bannerUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/banner.jpg"
 *               bannerCldPubId:
 *                 type: string
 *                 example: "classes/banner_123"
 *               schedules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       enum: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday]
 *                     startTime:
 *                       type: string
 *                       pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$'
 *                       example: "09:00"
 *                     endTime:
 *                       type: string
 *                       pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$'
 *                       example: "10:30"
 *     responses:
 *       201:
 *         description: Class created successfully
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
router.post('/', validate(classesValidation.createClass), classesController.createClass);

/**
 * @openapi
 * /api/classes/{id}:
 *   get:
 *     tags:
 *       - Classes
 *     summary: Get class details
 *     description: Retrieve detailed information about a specific class including subject, department, and teacher information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Class ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successful response with class details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   allOf:
 *                     - $ref: '#/components/schemas/Class'
 *                     - type: object
 *                       properties:
 *                         subject:
 *                           $ref: '#/components/schemas/Subject'
 *                         department:
 *                           $ref: '#/components/schemas/Department'
 *                         teacher:
 *                           $ref: '#/components/schemas/User'
 *             example:
 *               data:
 *                 id: 1
 *                 name: "Introduction to Computer Science"
 *                 description: "Learn the fundamentals"
 *                 inviteCode: "abc123"
 *                 capacity: 50
 *                 status: "active"
 *                 subject:
 *                   id: 1
 *                   name: "Computer Science"
 *                   code: "CS101"
 *                 department:
 *                   id: 1
 *                   name: "Computer Science"
 *                   code: "CS"
 *                 teacher:
 *                   id: "user_123"
 *                   name: "Dr. Smith"
 *                   email: "smith@example.com"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', validate(classesValidation.getClass), classesController.getClass);

/**
 * @openapi
 * /api/classes/{id}/users:
 *   get:
 *     tags:
 *       - Classes
 *     summary: Get users in a class by role
 *     description: Retrieve a paginated list of teachers or students in a specific class
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Class ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: role
 *         in: query
 *         required: true
 *         description: User role to filter by
 *         schema:
 *           type: string
 *           enum: [teacher, student]
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
 *                 - id: "user_456"
 *                   name: "Jane Doe"
 *                   email: "jane@example.com"
 *                   role: "student"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 45
 *                 totalPages: 5
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/users', validate(classesValidation.getClassUsers), classesController.getClassUsers);

export default router;
