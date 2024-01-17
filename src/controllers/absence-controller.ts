import { RequestHandler } from 'express';

import { getAbsences } from '../services/absence-service';

export const getAbsencesHandler: RequestHandler = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const absences = await getAbsences(userId);
    res.status(200).json({
      message: 'Success',
      data: absences,
    });
  } catch (error) {
    next(error);
  }
};
