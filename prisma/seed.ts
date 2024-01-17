import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/hash';

const prisma = new PrismaClient();

async function main() {
  await prisma.absence.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.teacher.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await hashPassword('test12345');

  const teacherUser = await prisma.user.create({
    data: {
      name: 'Teacher',
      surname: 'One',
      username: 'teacher1',
      password: hashedPassword,
      teacher: {
        create: {},
      },
    },
    include: {
      teacher: true,
    },
  });

  const studentUser1 = await prisma.user.create({
    data: {
      name: 'Student',
      surname: 'One',
      username: 'student1',
      password: hashedPassword,
      student: {
        create: {},
      },
    },
    include: {
      student: true,
    },
  });

  const studentUser2 = await prisma.user.create({
    data: {
      name: 'Student',
      surname: 'Two',
      username: 'student2',
      password: hashedPassword,
      student: {
        create: {},
      },
    },
    include: {
      student: true,
    },
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      subject: 'Math',
      startTime: '09:00',
      endTime: '10:30',
      day: 'Monday',
      location: 'Room 101',
      teacherId: teacherUser.teacher!.id,
      students: {
        connect: [{ userId: studentUser1.id }, { userId: studentUser2.id }],
      },
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      subject: 'History',
      startTime: '11:00',
      endTime: '12:30',
      day: 'Wednesday',
      location: 'Room 202',
      teacherId: teacherUser.teacher!.id,
      students: {
        connect: [{ userId: studentUser1.id }],
      },
    },
  });

  const grade1 = await prisma.grade.create({
    data: {
      score: 5,
      assessmentDate: new Date('2024-01-17T12:00:00Z'),
      comment: 'Excellent work!',
      teacherId: teacherUser.teacher!.id,
      studentId: studentUser1.student!.id,
      lessonId: lesson1.id,
    },
  });
  const grade2 = await prisma.grade.create({
    data: {
      score: 4,
      assessmentDate: new Date('2024-01-17T12:00:00Z'),
      comment: 'Excellent work!',
      teacherId: teacherUser.teacher!.id,
      studentId: studentUser1.student!.id,
      lessonId: lesson1.id,
    },
  });

  const absence1 = await prisma.absence.create({
    data: {
      date: new Date('2024-01-18T12:00:00Z'),
      teacherId: teacherUser.teacher!.id,
      studentId: studentUser1.student!.id,
      lessonId: lesson1.id,
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
