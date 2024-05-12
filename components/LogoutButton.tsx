'use client';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAuth } from './AuthProvider';
import { logoutUser } from '@/lib/fetch/logout';

const LogoutButton = () => {
  const router = useRouter();
  const { handleUser } = useAuth();

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
    <Button
      variant='destructive'
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
