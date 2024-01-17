import { prisma } from '../utils/db-client';
import { NotFoundError } from '../utils/errors';

export const getStudentLessons = async (studentId: string) => {
  const queryResult = await prisma.lesson.findMany({
    where: {
      students: { some: { id: studentId } },
    },
    include: {
      teacher: { select: { user: { select: { name: true, surname: true } } } },
    },
  });

  const lessons = queryResult.map((lesson) => {
    const { teacherId, teacher, ...lessonDetails } = lesson;
    return {
      ...lessonDetails,
      teacher: {
        id: teacherId,
        name: teacher.user.name,
        surname: teacher.user.surname,
      },
    };
  });

  return lessons;
};

export const getTeacherLessons = (teacherId: string) => {
  return prisma.lesson.findMany({
    where: {
      teacher: {
        id: teacherId,
      },
    },
  });
};

export const getLesson = async (teacherId: string, lessonId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      teacher: {
        id: teacherId,
      },
    },
    include: {
      students: {
        include: {
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

  if (!lesson) throw new NotFoundError('No lesson found with id ' + lessonId);

  const { students: arr, ...lessonDetails } = lesson;
  const students = arr.map((student) => {
    return {
      id: student.id,
      name: student.user.name,
      surname: student.user.surname,
    };
  });

  return { ...lessonDetails, students };
};
