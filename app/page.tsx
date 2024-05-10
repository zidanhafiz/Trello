import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/Heading';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

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

export default async function Home() {
  const user = await getUserBySession();

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
                  <td>: 10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Separator className='mb-5 mt-4' />
          <div className='flex justify-center gap-6'>
            <Button asChild>
              <Link href='/todos'>See my todos</Link>
            </Button>
            <Button variant='destructive'>Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
