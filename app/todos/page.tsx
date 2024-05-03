import Heading from '@/components/Heading';
import React from 'react';

const Todos = () => {
  return (
    <div>
      <Heading size='md'>My Todos</Heading>
      <div className='bg-white p-4 rounded-md shadow-sm'>
        <p className='text-slate-500'>
          Welcome to your dashboard! Explore and manage your account effortlessly.
        </p>
      </div>
    </div>
  );
};

export default Todos;
