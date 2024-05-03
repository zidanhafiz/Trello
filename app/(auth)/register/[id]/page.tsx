import Heading from '@/components/Heading';
import React from 'react';

const VerificationPage = () => {
  return (
    <div>
      <Heading size='md'>Verify Your Email to Get Started</Heading>
      <div className='bg-white p-4 rounded-md shadow-sm'>
        <p className='text-slate-500'>
          A confirmation link has been sent to your email address{' '}
          <strong>user-email@gmail.com</strong>. Click the link to verify your account and
          unlock full access.
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;
