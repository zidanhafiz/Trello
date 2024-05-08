'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import logo from '/public/logo.png';
import { useAuth } from './AuthProvider';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/fetch/logout';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className='flex justify-between items-center p-4 md:py-4 md:px-14 bg-white border-b-2'>
      <Link href='/'>
        <Image
          src={logo}
          alt='trello'
          width={88}
          height={88}
          className='w-fit'
        />
      </Link>
      <div className='space-x-4'>
        {user ? (
          <AvatarButton />
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

type User = {
  id: string;
  name: string;
  email: string;
};

const AvatarButton = () => {
  const router = useRouter();
  const { user, handleUser } = useAuth();

  const logoutHandler = async () => {
    try {
      await logoutUser();

      handleUser();
      router.push('/login');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='font-semibold flex items-center gap-3'>
        <Avatar>
          <AvatarImage
            src='https://github.com/shadcn.png'
            alt='@shadcn'
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {user?.name.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className='mr-2 h-4 w-4' />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className='text-red-400 hover:text-red-500'
          onClick={logoutHandler}
        >
          <LogOut className='mr-2 h-4 w-4' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
