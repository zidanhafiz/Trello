import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/Heading';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { getAllTodos } from '@/lib/models/todo';
import LogoutButton from '@/components/LogoutButton';
import { NextRequest } from 'next/server';

const getUserBySession = async () => {
  const accessToken = cookies().get('access_token');

  try {
    const decode = jwt.verify(
      accessToken?.value as string,
      process.env.SECRET_KEY as string
    ) as jwt.JwtPayload;

    const { userId, email, name } = decode;

    return { userId, email, name };
  } catch (error: any) {
    return null;
  }
};

const getUserTodos = async (userId: string) => {
  try {
    const data = await getAllTodos(userId);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default async function Home() {
  const user = await getUserBySession();
  const todos = await getUserTodos(user?.userId);

  return (
    <div>
      <Heading size='md'>Dashboard</Heading>
      <div className='bg-white p-4 rounded-md shadow-sm'>
        <p className='text-slate-500'>
          Welcome to your dashboard! Explore and manage your account effortlessly.
        </p>
        <div className='mt-5'>
          <h2 className='text-lg font-semibold'>My Profile</h2>
          <Separator className='mb-5 mt-2' />
          <div>
            <table className='w-full border-separate border-spacing-2'>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>: {user?.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>: {user?.email}</td>
                </tr>
                <tr>
                  <td>Total todos</td>
                  <td>: {todos.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Separator className='mb-5 mt-4' />
          <div className='flex justify-center gap-6'>
            <Button asChild>
              <Link href='/todos'>See my todos</Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
