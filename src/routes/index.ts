import { Router } from 'express';

import authRoutes from './auth-routes';
import lessonRoutes from './lesson-routes';
import gradeRoutes from './grade-routes';
import absenceRoutes from './absence-routes';
import { requireAuthRole, validateToken } from '../middlewares/validations';

const router = Router();

router.use('/auth', authRoutes);
router.use(validateToken);
router.use('/lessons', lessonRoutes);
router.use('/grades', gradeRoutes);
router.use('/absences', absenceRoutes);

// !TEMP api for testing the auth and authorization
router.get('/status', requireAuthRole(['STUDENT']), (req, res) => {
  res.status(200).json({ message: 'You have valid token' });
});

export default router;
