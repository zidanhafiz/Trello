import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { getUserByEmail, updateAccessTokenUser } from '@/lib/models/user';
import jwt from 'jsonwebtoken';
import { loginSchema } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';
import { RateLimiter } from '@/lib/rateLimiter';

const rateLimiter = new RateLimiter({ windowSize: 10000, maxRequests: 5 });

export const POST = async (req: NextRequest) => {
  // Limit request
  const ip = req.ip ?? req.headers.get('X-Forwarded-For') ?? 'unknown';
  const isRateLimited = rateLimiter.limit(ip);

  if (isRateLimited)
    return NextResponse.json(
      { fieldError: 'root', message: 'Too many request please try again later' },
      { status: 429 }
    );

  // Main handler
  const body = await req.json();
  const accessToken = cookies().get('access_token');

  if (accessToken) return NextResponse.redirect(new URL('/', req.url));

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

    if (!user.isVerified)
      return NextResponse.json(
        { message: 'Your account is not verified. Please verify first!' },
        { status: 403 }
      );

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

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
