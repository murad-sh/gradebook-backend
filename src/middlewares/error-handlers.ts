import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ message });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Resource not found' });
};
