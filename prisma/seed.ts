import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const saltRounds = 10;
  const password = 'password123'; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
    },
  });
  console.log(`Created user: ${user.email} with password: ${password}`);

  await prisma.todo.createMany({
    data: [
      { title: 'Setup Docker for the project', userId: user.id, isCompleted: true },
      { title: 'Create a seed script', userId: user.id, isCompleted: true },
      { title: 'Write the final README file', userId: user.id, isCompleted: false },
      { title: 'Submit the hiring test', userId: user.id, isCompleted: false },
    ],
  });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });