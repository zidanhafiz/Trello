import Heading from '@/components/Heading';
import { getUserById } from '@/lib/models/user';
import { redirect } from 'next/navigation';

const VerificationPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getUserById(id);

  if (!user) redirect('/not-found');

  if (user.isVerified) redirect('/');

  return (
    <div>
      <Heading size='md'>Verify Your Email to Get Started</Heading>
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

export default VerificationPage;
