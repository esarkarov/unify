import { validate } from '@/shared/middlewares/validation.middleware';
import { Router } from 'express';
import { subjectsController } from './subjects.controller';
import { subjectsValidation } from './subjects.validation';

const router = Router();

router.get('/', validate(subjectsValidation.getSubjects), subjectsController.getSubjects);
router.post('/', validate(subjectsValidation.createSubject), subjectsController.createSubject);

export default router;
