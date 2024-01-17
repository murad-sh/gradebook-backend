import { RequestHandler, ErrorRequestHandler } from 'express';

import { CustomError } from '../utils/errors';

export const errorHandler: ErrorRequestHandler = (
  error: CustomError,
  req,
  res,
  next
) => {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  res.status(status).json({ message: message });
};

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ message: 'Resource not found' });
};
