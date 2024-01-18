import { Router } from 'express';

import { requireAuthRole, validateParams } from '../middlewares/validations';
import {
  getGradesHandler,
  addGradeHandler,
  getStudentGradesHandler,
  updateGradeHandler,
  deleteGradeHandler,
} from '../controllers/grade-controller';
import { validateRequest } from '../middlewares/validations';
import {
  gradeIdSchema,
  gradeSchema,
  gradeUpdateSchema,
} from '../schemas/grade';
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

gradeRoutes.patch(
  '/:gradeId',
  [
    requireAuthRole(['TEACHER']),
    validateRequest(gradeUpdateSchema),
    validateParams(gradeIdSchema),
  ],
  updateGradeHandler
);
gradeRoutes.delete(
  '/:gradeId',
  [requireAuthRole(['TEACHER']), validateParams(gradeIdSchema)],
  deleteGradeHandler
);

export default gradeRoutes;
