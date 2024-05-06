import { getUserById } from '@/lib/models/user';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  try {
    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
};
