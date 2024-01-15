import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/hash';
const prisma = new PrismaClient();
async function main() {
  const password1 = await hashPassword('test12345');
  const password2 = await hashPassword('test12345');

  const student = await prisma.user.create({
    data: {
      name: 'Murad',
      surname: 'Shahbazov',
      username: 'murad-sh',
      role: 'STUDENT',
      password: password1,
    },
  });
  const teacher = await prisma.user.create({
    data: {
      name: 'Andrew',
      surname: 'Tate',
      username: 'cobra',
      role: 'TEACHER',
      password: password2,
    },
  });
  console.log({ student, teacher });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
