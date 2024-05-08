import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const accessToken = cookies().get('access_token');

  if (!accessToken) {
    return NextResponse.json({ status: 400 });
  }

  cookies().delete('access_token');

  return NextResponse.json({ status: 201 });
};
