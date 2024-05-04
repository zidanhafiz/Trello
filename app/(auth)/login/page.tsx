'use client';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema, loginSchema } from '@/lib/schema';
import Heading from '@/components/Heading';
import ErrorMessage from '@/components/ErrorMessage';
import { useState } from 'react';

const data = {
  email: 'zidan@gmail.com',
  password: 'zidan123',
};

const Login = () => {
  const [invalid, setInvalid] = useState<string | null>(null);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { errors } = form.formState;

  function onSubmit(values: LoginSchema) {
    const { email, password } = values;
    if (email !== data.email || password !== data.password) {
      return setInvalid(
        `The email and password you entered don't match. Please try again`
      );
    }
    return setInvalid(null);
  }

  return (
    <div>
      <Heading
        size='lg'
        className='mb-2'
      >
        Welcome Back!
      </Heading>
      <p className='font-medium mb-9'>
        Sign in below to access your workspace and continue your projects. Let&apos;s pick
        up where you left off!
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-y-4'
        >
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
              </FormItem>
            )}
          />
          {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
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
              </FormItem>
            )}
          />
          {errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
          {invalid && !errors.password && <ErrorMessage>{invalid}</ErrorMessage>}
          <Button
            type='submit'
            className='w-full mt-5'
          >
            Sign In
          </Button>
        </form>
      </Form>
      <div className='mt-9'>
        <p className='font-medium text-center'>
          Don&apos;t have an account?{' '}
          <Link
            href='/register'
            className='underline'
          >
            Sign Up
          </Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default Login;
