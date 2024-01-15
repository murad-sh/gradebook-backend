import { Router } from 'express';

import authRoutes from './auth-routes';
import { requireAuthRole, validateToken } from '../middlewares/validations';

const router = Router();

router.use('/auth', authRoutes);
router.use(validateToken);

// !TEMP api for testing the auth and authorization
router.get('/status', requireAuthRole(['TEACHER']), (req, res) => {
  res.status(200).json({ message: 'You have valid token' });
});

export default router;
