import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '@/lib/models/user';
import jwt from 'jsonwebtoken';
import { registerSchema } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';
import { VerifyData } from '@/lib/types';
import { sendVerifyEmail } from '@/lib/mailtrap';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const { name, email, password } = await registerSchema.parseAsync(body);
    const emailExist = await getUserByEmail(email);

    if (emailExist) {
      console.log('email error');
      return NextResponse.json(
        {
          fieldError: 'email',
          message:
            'Oops! It seems this email is already in use. Please try another email address or sign in with your existing account',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyToken = jwt.sign({ email }, process.env.SECRET_KEY as string, {
      expiresIn: '15m',
    });

    const data = {
      name,
      email,
      password: hashedPassword,
      accessToken: null,
    };

    const res = await createUser(data, verifyToken);

    const verifyData = {
      userId: res.id,
      username: res.name,
      email: res.email,
      token: verifyToken,
    };

    await sendVerifyEmail(verifyData);

    return NextResponse.json(
      {
        message: 'Success create new account!',
        userId: res.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { fieldError: 'root', message: error.message },
      { status: 400 }
    );
  }
};
