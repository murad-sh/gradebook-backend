import { RequestHandler, Request } from 'express';

import { prisma } from '../utils/db-client';
import { verifyPassword } from '../utils/hash';
import { createToken } from '../utils/jwt';
import { LoginSchemaType } from '../schemas/auth';
import { NotAuthenticatedError, NotFoundError } from '../utils/errors';

export const login: RequestHandler = async (
  req: Request<{}, {}, LoginSchemaType>,
  res,
  next
) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return next(new NotAuthenticatedError('Invalid username or password'));
    }

    const { password: _, ...payload } = user;
    const token = createToken({ id: user.id, role: user.role });

    res.status(200).json({ message: 'Login successful', token, user: payload });
  } catch (error) {
    next(error);
  }
};
