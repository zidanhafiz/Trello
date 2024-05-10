import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { getUserById } from '@/lib/models/user';
import Link from 'next/link';
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
        <p className='text-slate-500 mb-5'>
          A confirmation link has been sent to your email address{' '}
          <strong>{user.email}</strong>. Click the link to verify your account and unlock
          full access.
        </p>
        <Button asChild>
          <Link href={`/register/${id}/resend`}>Resend link</Link>
        </Button>
      </div>
    </div>
  );
};

export default VerificationPage;
