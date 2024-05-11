import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createTodo, getAllTodos } from '@/lib/models/todo';
import { todoSchema } from '@/lib/schema';

const SECRET_KEY = process.env.SECRET_KEY as string;

const isAuthorize = async (req: NextRequest) => {
  const accessToken = req.cookies.get('access_token');

  if (!accessToken) return { isAuth: false };

  try {
    const decode = jwt.verify(accessToken.value as string, SECRET_KEY) as jwt.JwtPayload;

    return { isAuth: true, decode };
  } catch (error) {
    return { isAuth: false };
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { isAuth, decode } = await isAuthorize(req);

    if (!isAuth) return NextResponse.json({ status: 403 });

    const { userId } = decode as jwt.JwtPayload;

    const body = await req.json();
    const { title, content } = await todoSchema.parseAsync(body);

    const data = {
      title,
      content,
      userId,
    };

    await createTodo(data);

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { isAuth, decode } = await isAuthorize(req);

    if (!isAuth) return NextResponse.json({ status: 403 });

    const { userId } = decode as jwt.JwtPayload;
    const data = await getAllTodos(userId);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};
