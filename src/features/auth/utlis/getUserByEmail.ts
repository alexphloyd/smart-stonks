import prisma from 'db';

export default async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}
