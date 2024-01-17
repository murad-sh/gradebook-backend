import { Student, Teacher, User } from '@prisma/client';

import { prisma } from '../utils/db-client';
import { verifyPassword } from '../utils/hash';
import {
  NotAuthenticatedError,
  NotAuthorizedError,
  NotFoundError,
} from '../utils/errors';
import { Role } from '../types/token-payload';

export const authenticateUser = async (username: string, password: string) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const role = getUserRole(user);

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new NotAuthenticatedError('Invalid username or password');
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    surname: user.surname,
    ...role,
  };
};

const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      teacher: true,
      student: true,
    },
  });

  return user;
};

const getUserRole = (
  user: User & {
    teacher: Teacher | null;
    student: Student | null;
  }
): { role: Role; roleId: string } => {
  if (user.teacher) {
    return {
      role: 'TEACHER',
      roleId: user.teacher.id,
    };
  }
  if (user.student) {
    return {
      role: 'STUDENT',
      roleId: user.student.id,
    };
  }

  throw new NotAuthorizedError('User does not have a valid role');
};
