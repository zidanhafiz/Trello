import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { getUserByEmail, updateAccessTokenUser } from '@/lib/models/user';
import jwt from 'jsonwebtoken';
import { loginSchema } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const { email, password } = await loginSchema.parseAsync(body);

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          message: `The email and password you entered don't match. Please try again`,
        },
        { status: 400 }
      );
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return NextResponse.json(
        {
          message: `The email and password you entered don't match. Please try again`,
        },
        { status: 400 }
      );
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: '1d' }
    );

    await updateAccessTokenUser(user.id, accessToken);

    cookies().set('access_token', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
