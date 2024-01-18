import { RequestHandler, Request } from 'express';

import {
  getAbsences,
  addAbsence,
  getStudentAbsencesByLesson,
  deleteAbsence,
} from '../services/absence-service';
import { AbsenceSchemaType } from '../schemas/absence';
import { LessonDataParamsSchemaType } from '../schemas/helper';

export const getAbsencesHandler: RequestHandler = async (req, res, next) => {
  const studentId = req.user.roleId;

  try {
    const absences = await getAbsences(studentId);
    res.status(200).json({
      message: 'Success',
      data: { absences },
    });
  } catch (error) {
    next(error);
  }
};

export const addAbsenceHandler: RequestHandler = async (
  req: Request<{}, {}, AbsenceSchemaType>,
  res,
  next
) => {
  const teacherId = req.user.roleId;
  const absenceData = req.body;

  try {
    const absence = await addAbsence(teacherId, absenceData);
    res.status(201).json({
      message: 'Absence added successfully',
      data: { absence },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentAbsencesHandler: RequestHandler<
  LessonDataParamsSchemaType
> = async (req, res, next) => {
  const teacherId = req.user.roleId;
  const { lessonId, studentId } = req.params;
  try {
    const absences = await getStudentAbsencesByLesson(
      teacherId,
      lessonId,
      studentId
    );
    res.status(200).json({
      message: 'Success',
      data: { absences },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAbsenceHandler: RequestHandler<{
  absenceId: string;
}> = async (req, res, next) => {
  const teacherId = req.user.roleId;
  const { absenceId } = req.params;

  try {
    await deleteAbsence(teacherId, absenceId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
