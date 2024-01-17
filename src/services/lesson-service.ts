import { prisma } from '../utils/db-client';
import { NotFoundError } from '../utils/errors';

export const getStudentLessons = async (userId: string) => {
  const queryResult = await prisma.lesson.findMany({
    where: {
      students: {
        some: {
          userId,
        },
      },
    },
    include: {
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

export const getTeacherLessons = async (userId: string) => {
  return await prisma.lesson.findMany({
    where: {
      teacher: {
        userId,
      },
    },
  });
};

export const getLesson = async (userId: string, lessonId: string) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      teacher: {
        userId,
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
