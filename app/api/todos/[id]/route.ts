import { deleteTodoById, getTodoById, updateTodoById } from '@/lib/models/todo';
import { todoSchema } from '@/lib/schema';
import { Todo } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const data = await getTodoById(id);

    if (!data) return NextResponse.json({ status: 404 });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await deleteTodoById(id);

    return NextResponse.json({ status: 203 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  const body = await req.json();
  try {
    const data = await todoSchema.parseAsync(body);

    await updateTodoById(id, data as Todo);

    return NextResponse.json({ status: 201 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};
