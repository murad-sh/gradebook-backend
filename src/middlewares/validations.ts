import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';
import { fromZodError } from 'zod-validation-error';

import {
  NotAuthenticatedError,
  NotAuthorizedError,
  ValidationError,
} from '../utils/errors';
import { verifyToken } from '../utils/jwt';
import { Role } from '../types/token-payload';

export const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return (req, res, next) => {
    const parsed = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!parsed.success) {
      const errorMessage = fromZodError(parsed.error).message;
      return next(new ValidationError(errorMessage));
    }

    next();
  };
};

export const validateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new NotAuthenticatedError('Invalid Token'));
  }
};

export const requireAuthRole = (allowedRoles: Role[]): RequestHandler => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new NotAuthenticatedError('Not authenticated'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new NotAuthorizedError('Not authorized'));
    }

    next();
  };
};
