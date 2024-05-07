import { getUserById, updateIsVerifiedUser } from '@/lib/models/user';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const VerifyPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { id } = params;
  const { token } = searchParams;
  const user = await getUserById(id);

  if (!user) redirect('/not-found');

  if (user.isVerified) redirect('/');

  try {
    const decode = jwt.verify(
      token as string,
      process.env.SECRET_KEY as string
    ) as jwt.JwtPayload;

    const email = decode.email;

    if (user.email !== email) redirect('/not-found');

    const verified = true;

    await updateIsVerifiedUser(id, verified);

    return (
      <div className='grid justify-content-center w-fit mx-auto mt-5'>
        <h1 className='text-2xl font-bold mb-5'>Verified Success!</h1>
        <Button asChild>
          <Link href='/login'>Return to login</Link>
        </Button>
      </div>
    );
  } catch (error: any) {
    console.error(error.message);

    return (
      <div className='grid justify-content-center w-fit mx-auto mt-5'>
        <h1 className='text-2xl font-bold mb-5'>Verification failed!</h1>
        <Button asChild>
          <Link href='/login'>Return to login</Link>
        </Button>
      </div>
    );
  }
};

export default VerifyPage;
