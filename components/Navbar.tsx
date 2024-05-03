'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center p-4 md:py-4 md:px-14 bg-white border-b-2'>
      <Link href='/'>
        <Image
          src='/logo.png'
          alt='trello'
          width={88}
          height={88}
          className='w-fit'
        />
      </Link>
      <div className='space-x-4'>
        <Link
          href='/login'
          className='bg-transparent hover:bg-transparent text-primary font-semibold'
        >
          Login
        </Link>
        <Button
          asChild
          className=''
        >
          <Link href='/register'>Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
