import { prisma } from '../utils/db-client';
import { AbsenceSchemaType } from '../schemas/absence';

export const getAbsences = async (studentId: string) => {
  const queryResult = await prisma.absence.findMany({
    where: {
      studentId,
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

export const addAbsence = async (
  teacherId: string,
  absenceData: AbsenceSchemaType
) => {
  const absence = await prisma.absence.create({
    data: {
      ...absenceData,
      teacherId,
    },
  });

  return absence;
};

export const getStudentAbsencesByLesson = (
  teacherId: string,
  lessonId: string,
  studentId: string
) => {
  return prisma.absence.findMany({
    where: {
      teacherId,
      lessonId,
      studentId,
    },
  });
};
