import { RequestHandler } from 'express';

import {
  getStudentLessons,
  getTeacherLessons,
  getLesson,
} from '../services/lesson-service';
import { ValidationError } from '../utils/errors';

export const getLessonsHandler: RequestHandler<
  {},
  {},
  {},
  { role: string }
> = async (req, res, next) => {
  const { role, roleId } = req.user;

  const findLessons =
    role === 'TEACHER' ? getTeacherLessons : getStudentLessons;

  try {
    const lessons = await findLessons(roleId);
    res.status(200).json({ message: 'Success', data: { lessons } });
  } catch (error) {
    next(error);
  }
};

export const getLessonHandler: RequestHandler<{ lessonId: string }> = async (
  req,
  res,
  next
) => {
  const { lessonId } = req.params;
  const teacherId = req.user.roleId;

  if (!lessonId) return next(new ValidationError('Lesson id not provided'));

  try {
    const lesson = await getLesson(teacherId, lessonId);
    res.status(200).json({ message: 'Success', data: { lesson } });
  } catch (error) {
    next(error);
  }
};
