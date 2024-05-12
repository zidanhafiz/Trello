'use client';
import { DeleteAlert } from '@/components/DeleteAlert';
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTodo } from '@/lib/hooks/useTodos';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { deleteTodo } from '@/lib/fetch/todo';
import { toast } from '@/components/ui/use-toast';

const Details = () => {
  const { id } = useParams();
  const router = useRouter();
  const { todo, isLoading } = useTodo(id as string);

  const deleteTodoHandle = async () => {
    try {
      await deleteTodo(id as string);

      toast({
        title: 'Success',
        description: 'Success delete todo!',
      });

      router.push('/todos');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error delete todo!',
        variant: 'destructive',
      });

      router.push('/todos');
    }
  };

  if (isLoading) {
    return (
      <div className='w-full p-4 bg-white rounded-md grid gap-4'>
        <Skeleton className='w-full h-16' />
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full h-52' />
        <Skeleton className='w-full h-12' />
      </div>
    );
  }

  return (
    <div className='bg-white p-4 rounded-md'>
      <Heading size='md'>{todo?.title}</Heading>
      <span>{formatDate(todo?.createdAt as string)}</span>
      <Separator className='my-4' />
      <p className='min-h-64'>{todo?.content}</p>
      <span
        className={cn(
          todo?.finished ? 'bg-emerald-700' : 'bg-yellow-600',
          'p-3 rounded-lg font-medium text-white'
        )}
      >
        {todo?.finished ? 'Finished' : 'Unfinished'}
      </span>
      <Separator className='my-4' />
      <div className='flex justify-end gap-3'>
        <Button asChild>
          <Link href={`/todos/${id}/edit`}>Edit</Link>
        </Button>
        <DeleteAlert
          action={deleteTodoHandle}
          message='Delete this todo?'
        >
          Delete
        </DeleteAlert>
      </div>
    </div>
  );
};

export default Details;
