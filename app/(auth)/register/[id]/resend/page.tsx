import { getUserById, updateTokenUser } from '@/lib/models/user';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import Heading from '@/components/Heading';
import { VerifyData } from '@/lib/types';
import { resendVerifyEmail } from '@/lib/mailtrap';

const ResendPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getUserById(id);

  if (!user) redirect('/not-found');

  if (user.isVerified) redirect('/');

  const newToken = jwt.sign({ email: user.email }, process.env.SECRET_KEY as string, {
    expiresIn: '15m',
  });

  await updateTokenUser(id, newToken);

  const verifyData = {
    userId: user.id,
    username: user.name,
    email: user.email,
    token: newToken,
  } as VerifyData;

  await resendVerifyEmail(verifyData);

  return (
    <div>
      <Heading size='md'>Confirmation link was sent into your email!</Heading>
      <div className='bg-white p-4 rounded-md shadow-sm'>
        <p className='text-slate-500'>
          A confirmation link has been sent to your email address{' '}
          <strong>{user.email}</strong>. Click the link to verify your account and unlock
          full access.
        </p>
      </div>
    </div>
  );
};

export default ResendPage;
