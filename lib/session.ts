'use server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const getSession = async () => {
  const accessToken = cookies().get('access_token');

  if (accessToken) {
    try {
      const decode = jwt.verify(
        accessToken?.value as string,
        process.env.SECRET_KEY as string
      ) as jwt.JwtPayload;

      return {
        id: decode.userId,
        name: decode.name,
        email: decode.email,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
};
