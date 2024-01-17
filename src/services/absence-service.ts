import { prisma } from '../utils/db-client';

export const getAbsences = async (userId: string) => {
  const queryResult = await prisma.absence.findMany({
    where: {
      student: {
        userId,
      },
    },
    select: {
      id: true,
      date: true,
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

  const absences = queryResult.map((absence) => {
    const { lesson, teacher, ...absenceDetails } = absence;

    return {
      ...absenceDetails,
      lesson: lesson.subject,
      teacher: {
        name: teacher.user.name,
        surname: teacher.user.surname,
      },
    };
  });

  return absences;
};
