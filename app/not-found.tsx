import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='text-center mt-10'>
      <h1 className='text-5xl font-bold'>404</h1>
      <p className='font-medium text-lg my-4'>Sorry page not found!</p>
      <Button asChild>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
