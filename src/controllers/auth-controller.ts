import { CookieOptions, NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { prisma } from '../utils/db-client';
import { verifyPassword } from '../utils/hash';
import { LoginSchemaType } from '../utils/validations/auth';

const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);

const cookieOptions: CookieOptions = {
  httpOnly: true,
  maxAge: 3600000,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: LoginSchemaType = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const { password: pw, ...payload } = user;
    console.log(payload);

    const token = sign({ id: user.id }, jwtSecret!, {
      expiresIn: '1h',
    });

    res.cookie('token', token, cookieOptions);

    res.status(200).json({ message: 'Login successful', user: payload });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token').status(200).json({ message: 'Logout successful' });
};
