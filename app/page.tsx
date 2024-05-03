'use client';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { Separator } from '@/components/ui/separator';
import Heading from '@/components/Heading';
import { profileSchema, ProfileSchema } from '@/lib/schema';

export default function Home() {
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  function onSubmit(values: ProfileSchema) {
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
