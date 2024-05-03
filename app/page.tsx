'use client';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/Heading';

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: 'Full Name must be at least 3 characters.',
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <Heading size='md'>Dashboard</Heading>
      <div className='bg-white p-4 rounded-md shadow-sm'>
        <p className='text-slate-500'>
          Welcome to your dashboard! Explore and manage your account effortlessly.
        </p>
        <div className='mt-5'>
          <h2 className='text-lg font-semibold'>Edit Profile</h2>
          <Separator className='mb-5 mt-2' />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-5'
            >
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Full Name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Save</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
