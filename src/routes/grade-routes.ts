import { Router } from 'express';

import { requireAuthRole } from '../middlewares/validations';
import { getGradesHandler } from '../controllers/grade-controller';

const gradeRoutes = Router();

gradeRoutes.get('/', requireAuthRole(['STUDENT']), getGradesHandler);

export default gradeRoutes;
