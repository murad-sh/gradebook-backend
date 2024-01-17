import { RequestHandler, Request } from 'express';

import {
  addGrade,
  getGrades,
  getStudentGradesByLesson,
} from '../services/grade-service';
import { GradeSchemaType } from '../schemas/grade';
import { LessonDataParamsSchemaType } from '../schemas/helper';

export const getGradesHandler: RequestHandler = async (req, res, next) => {
  const studentId = req.user.roleId;

  try {
    const grades = await getGrades(studentId);
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

export const addGradeHandler: RequestHandler = async (
  req: Request<{}, {}, GradeSchemaType>,
  res,
  next
) => {
  const teacherId = req.user.roleId;
  const gradeData = req.body;

  try {
    const grade = await addGrade(teacherId, gradeData);
    res.status(201).json({
      message: 'Grade added successfully',
      data: { grade },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentGradesHandler: RequestHandler<
  LessonDataParamsSchemaType
> = async (req, res, next) => {
  const teacherId = req.user.roleId;
  const { lessonId, studentId } = req.params;
  try {
    const grades = await getStudentGradesByLesson(
      teacherId,
      lessonId,
      studentId
    );
    res.status(200).json({
      message: 'Success',
      data: { grades },
    });
  } catch (error) {
    next(error);
  }
};
