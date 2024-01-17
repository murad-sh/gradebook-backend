import { Router } from 'express';

import { requireAuthRole, validateParams } from '../middlewares/validations';
import {
  getGradesHandler,
  addGradeHandler,
  getStudentGradesHandler,
} from '../controllers/grade-controller';
import { validateRequest } from '../middlewares/validations';
import { gradeSchema } from '../schemas/grade';
import { lessonDataParamsSchema } from '../schemas/helper';

const gradeRoutes = Router();

gradeRoutes.get('/', requireAuthRole(['STUDENT']), getGradesHandler);
gradeRoutes.post(
  '/',
  [requireAuthRole(['TEACHER']), validateRequest(gradeSchema)],
  addGradeHandler
);
gradeRoutes.get(
  '/:lessonId/:studentId',
  [requireAuthRole(['TEACHER']), validateParams(lessonDataParamsSchema)],
  getStudentGradesHandler
);

export default gradeRoutes;
