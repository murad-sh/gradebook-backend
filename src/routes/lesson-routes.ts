import { Router } from 'express';

import { requireAuthRole } from '../middlewares/validations';
import {
  getLessonsHandler,
  getLessonHandler,
} from '../controllers/lesson-controller';

const lessonRoutes = Router();

lessonRoutes.get(
  '/',
  requireAuthRole(['STUDENT', 'TEACHER']),
  getLessonsHandler
);
lessonRoutes.get('/:lessonId', requireAuthRole(['TEACHER']), getLessonHandler);

export default lessonRoutes;
