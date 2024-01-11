import { Router } from 'express';

import { login } from '../controllers/auth-controller';
import { loginSchema } from '../utils/validations/auth';
import { validateRequest } from '../middlewares/validation';

const authRoutes = Router();

authRoutes.post('/login', validateRequest(loginSchema), login);

export default authRoutes;
