'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { todoSchema, TodoSchema } from '@/lib/schema';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { createNewTodo } from '@/lib/fetch/todo';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const Create = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: TodoSchema) => {
    try {
      await createNewTodo(values);

      toast({
        title: 'Success!',
        description: 'Success create a new todo!',
      });

      router.push('/todos');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error create a new todo!',
      });
      router.push('/todos');
    }
  };

  return (
    <div>
      <Heading size='md'>Create new todo</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-5'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Your title'
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className='resize-none bg-white'
                    placeholder='Description'
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end gap-4 mt-4'>
            <Button
              variant='secondary'
              asChild
            >
              <Link href='/todos'>Cancel</Link>
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'loading' : 'Create todo'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Create;
