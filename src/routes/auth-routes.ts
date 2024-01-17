import { Router } from 'express';

import { loginHandler } from '../controllers/auth-controller';
import { loginSchema } from '../schemas/auth';
import { validateRequest } from '../middlewares/validations';

const authRoutes = Router();

authRoutes.post('/login', validateRequest(loginSchema), loginHandler);

export default authRoutes;
