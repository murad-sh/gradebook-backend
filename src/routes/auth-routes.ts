import { Router } from 'express';

import { login } from '../controllers/auth-controller';
import { loginRequestSchema } from '../schemas/auth';
import { validateRequest } from '../middlewares/validations';

const authRoutes = Router();

authRoutes.post('/login', validateRequest(loginRequestSchema), login);

export default authRoutes;
