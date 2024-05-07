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
import { Checkbox } from '@/components/ui/checkbox';
import { loginUser } from '@/lib/fetch/login';

const Login = () => {
  const [invalid, setInvalid] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (values: LoginSchema) => {
    const res = await loginUser(values);

    if (res.message) return setInvalid(res.message)

    setInvalid(null);

  };

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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='items-center flex space-x-2 justify-self-end w-fit'>
            <Checkbox
              id='show-password'
              onCheckedChange={() => setShowPassword(!showPassword)}
              checked={showPassword}
              disabled={isSubmitting}
            />
            <label
              htmlFor='show-password'
              className='text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Show password
            </label>
          </div>
          {errors.password && <ErrorMessage>{errors.password?.message}</ErrorMessage>}
          {invalid && !errors.password && <ErrorMessage>{invalid}</ErrorMessage>}
          <Button
            type='submit'
            className='w-full mt-5'
            disabled={isSubmitting}
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
