'use client';
import Heading from '@/components/Heading';

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
import { registerSchema, RegisterSchema } from '@/lib/schema';
import Link from 'next/link';

const Register = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  function onSubmit(values: RegisterSchema) {
    console.log(values);
  }

  return (
    <div>
      <Heading size='lg'>Sign Up to Maia</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-y-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Your Name'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full mt-5'
          >
            Sign Up
          </Button>
        </form>
      </Form>
      <div className='text-primary font-medium text-center mt-9 space-y-5'>
        <p>
          By creating an account you agree with our{' '}
          <Link
            href='/terms'
            className='underline'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='underline'
          >
            Privacy Policy
          </Link>
        </p>
        <p>
          Already have an account?
          <Link
            href='login'
            className='underline'
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
