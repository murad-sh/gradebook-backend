import { Router } from 'express';

import { requireAuthRole, validateParams } from '../middlewares/validations';
import {
  getAbsencesHandler,
  addAbsenceHandler,
  getStudentAbsencesHandler,
} from '../controllers/absence-controller';
import { validateRequest } from '../middlewares/validations';
import { absenceSchema } from '../schemas/absence';
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

export default absenceRoutes;
