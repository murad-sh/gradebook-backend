import { RequestHandler, Request } from 'express';

import { createToken } from '../utils/jwt';
import { LoginSchemaType } from '../schemas/auth';
import { authenticateUser } from '../services/auth-service';

export const loginHandler: RequestHandler = async (
  req: Request<{}, {}, LoginSchemaType>,
  res,
  next
) => {
  const { username, password } = req.body;

  try {
    const user = await authenticateUser(username, password);
    const token = createToken({ id: user.id, role: user.role });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    next(error);
  }
};
