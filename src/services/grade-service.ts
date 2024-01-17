import { GradeSchemaType } from '../schemas/grade';
import { prisma } from '../utils/db-client';

export const getGrades = async (studentId: string) => {
  const queryResult = await prisma.grade.findMany({
    where: { student: { id: studentId } },
    select: {
      id: true,
      score: true,
      assessmentDate: true,
      comment: true,
      lesson: { select: { subject: true } },
      teacher: {
        select: {
          user: {
            select: {
              name: true,
              surname: true,
            },
          },
        },
      },
    },
  });

  const grades = queryResult.map((grade) => {
    const { lesson, teacher, ...gradeDetails } = grade;
    return {
      ...gradeDetails,
      subject: lesson.subject,
      teacher: {
        name: teacher.user.name,
        surname: teacher.user.surname,
      },
    };
  });
  return grades;
};

export const addGrade = async (
  teacherId: string,
  gradeData: GradeSchemaType
) => {
  const grade = await prisma.grade.create({
    data: {
      ...gradeData,
      teacherId,
    },
  });

  return grade;
};

export const getStudentGradesByLesson = (
  teacherId: string,
  lessonId: string,
  studentId: string
) => {
  return prisma.grade.findMany({
    where: {
      teacherId,
      lessonId,
      studentId,
    },
  });
};
