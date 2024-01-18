import { RequestHandler, Request } from 'express';

import {
  addGrade,
  getGrades,
  getStudentGradesByLesson,
  updateGrade,
  deleteGrade,
} from '../services/grade-service';
import { GradeSchemaType, GradeUpdateSchemaType } from '../schemas/grade';
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

export const deleteGradeHandler: RequestHandler<{ gradeId: string }> = async (
  req,
  res,
  next
) => {
  const teacherId = req.user.roleId;
  const { gradeId } = req.params;

  try {
    await deleteGrade(teacherId, gradeId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateGradeHandler: RequestHandler<
  { gradeId: string },
  {},
  GradeUpdateSchemaType
> = async (req, res, next) => {
  const teacherId = req.user.roleId;
  const { gradeId } = req.params;
  const gradeDetails = req.body;

  try {
    const updatedGrade = await updateGrade(teacherId, gradeId, gradeDetails);
    res.status(200).json({
      message: 'Grade updated successfully',
      data: { grade: updatedGrade },
    });
  } catch (error) {
    next(error);
  }
};
