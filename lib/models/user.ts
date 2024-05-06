import { prisma } from '../prisma';
import { User } from '../types';

export const createUser = async (data: User, token: string) => {
  return await prisma.user.create({
    data: {
      ...data,
      token: {
        create: {
          token,
        },
      },
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
