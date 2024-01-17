import { prisma } from '../utils/db-client';

export const getGrades = async (userId: string) => {
  const queryResult = await prisma.grade.findMany({
    where: {
      student: {
        userId,
      },
    },
    select: {
      id: true,
      score: true,
      assessmentDate: true,
      comment: true,
      lesson: {
        select: {
          subject: true,
        },
      },
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
