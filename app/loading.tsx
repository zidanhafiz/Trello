import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <div className='space-y-4'>
      <Skeleton className='w-full h-6' />
      <Skeleton className='w-full h-6' />
      <Skeleton className='w-full h-6' />
      <Skeleton className='w-full h-6' />
    </div>
  );
};

export default loading;
