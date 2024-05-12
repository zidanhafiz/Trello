'use client';
import Heading from '@/components/Heading';
import { Separator } from '@/components/ui/separator';
import { useTodo } from '@/lib/hooks/useTodos';
import { useParams } from 'next/navigation';
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
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateTodo } from '@/lib/fetch/todo';
import { Todo } from '@/lib/types';

const Edit = () => {
  const { id } = useParams();
  const { todo, isLoading } = useTodo(id as string);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      content: '',
      finished: false,
    },
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const onSubmit = async (values: TodoSchema) => {
    try {
      const data = {
        id,
        ...values,
      } as Todo;

      await updateTodo(data);

      toast({
        title: 'Success!',
        description: 'Success create a new todo!',
      });

      router.push('/todos');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error create a new todo!',
        variant: 'destructive',
      });
      router.push('/todos');
    }
  };

  useEffect(() => {
    setValue('title', todo?.title);
    setValue('content', todo?.content);
    setValue('finished', todo?.finished);
  }, [setValue, todo]);

  return (
    <div>
      <Heading size='md'>{todo?.title}</Heading>
      <Separator className='my-5' />

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
          <FormField
            control={form.control}
            name='finished'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proggress</FormLabel>
                <Select
                  onValueChange={(e) => field.onChange(e === 'Finished' ? true : false)}
                  defaultValue={field.value ? 'Finished' : 'Unfinished'}
                >
                  <FormControl>
                    <SelectTrigger className='bg-white'>
                      <SelectValue placeholder='Select proggress' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'Finished'}>Finished</SelectItem>
                    <SelectItem value={'Unfinished'}>Unfinished</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end gap-4 mt-4'>
            <Button
              variant='secondary'
              onClick={() => router.push('/todos')}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'loading' : 'Update todo'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Edit;
