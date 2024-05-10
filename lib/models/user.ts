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

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const updateIsVerifiedUser = async (id: string, verified: boolean) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      isVerified: verified,
      token: {
        delete: true,
      },
    },
  });
};

export const updateTokenUser = async (id: string, token: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      token: {
        update: {
          token,
        },
      },
    },
  });
};

export const updateAccessTokenUser = async (id: string, accessToken: string) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      accessToken,
    },
  });
};

export const deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
