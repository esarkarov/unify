import { Router } from 'express';

import { subjectsController } from '@/features/subjects/subjects.controller';
import { subjectsValidation } from '@/features/subjects/subjects.validation';
import { validate } from '@/shared/middlewares/validation.middleware';

const router = Router();

router.get('/', validate(subjectsValidation.getSubjects), subjectsController.getSubjects);
router.post('/', validate(subjectsValidation.createSubject), subjectsController.createSubject);

export default router;
