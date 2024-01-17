import { Router } from 'express';

import { loginHandler } from '../controllers/auth-controller';
import { loginRequestSchema } from '../schemas/auth';
import { validateRequest } from '../middlewares/validations';

const authRoutes = Router();

authRoutes.post('/login', validateRequest(loginRequestSchema), loginHandler);

export default authRoutes;
