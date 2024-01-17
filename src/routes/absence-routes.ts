import { Router } from 'express';

import { requireAuthRole } from '../middlewares/validations';
import { getAbsencesHandler } from '../controllers/absence-controller';

const absenceRoutes = Router();

absenceRoutes.get('/', requireAuthRole(['STUDENT']), getAbsencesHandler);

export default absenceRoutes;
