import { Router } from 'express';

import { requireAuthRole, validateParams } from '../middlewares/validations';
import {
  getAbsencesHandler,
  addAbsenceHandler,
  getStudentAbsencesHandler,
  deleteAbsenceHandler,
} from '../controllers/absence-controller';
import { validateRequest } from '../middlewares/validations';
import { absenceIdSchema, absenceSchema } from '../schemas/absence';
import { lessonDataParamsSchema } from '../schemas/helper';

const absenceRoutes = Router();

absenceRoutes.get('/', requireAuthRole(['STUDENT']), getAbsencesHandler);
absenceRoutes.post(
  '/',
  [requireAuthRole(['TEACHER']), validateRequest(absenceSchema)],
  addAbsenceHandler
);
absenceRoutes.get(
  '/:lessonId/:studentId',
  [requireAuthRole(['TEACHER']), validateParams(lessonDataParamsSchema)],
  getStudentAbsencesHandler
);

absenceRoutes.delete(
  '/:absenceId',
  [requireAuthRole(['TEACHER']), validateParams(absenceIdSchema)],
  deleteAbsenceHandler
);

export default absenceRoutes;
