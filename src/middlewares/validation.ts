import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { fromZodError } from 'zod-validation-error';

export const validateRequest = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.safeParse(req.body);

    if (!validatedData.success) {
      const errorMessage = fromZodError(validatedData.error).message;
      res.status(400);
      throw new Error(errorMessage);
    }

    req.body = validatedData.data;
    next();
  };
};
