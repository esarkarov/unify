import express from 'express';

import { departmentsController } from '@/features/departments/departments.controller';
import { departmentsValidation } from '@/features/departments/departments.validation';
import { validate } from '@/shared/middlewares/validation.middleware';

const router = express.Router();

router.get('/', validate(departmentsValidation.getDepartments), departmentsController.getDepartments);
router.post('/', validate(departmentsValidation.createDepartment), departmentsController.createDepartment);

export default router;
