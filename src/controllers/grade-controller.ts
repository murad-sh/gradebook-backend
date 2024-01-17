import { RequestHandler } from 'express';

import { getGrades } from '../services/grade-service';

export const getGradesHandler: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const grades = await getGrades(userId);
    res.status(200).json({
      message: 'Success',
      data: {
        grades,
      },
    });
  } catch (error) {
    next(error);
  }
};
