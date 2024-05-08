'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useReducer, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema, RegisterSchema } from '@/lib/schema';
import ErrorMessage from '@/components/ErrorMessage';
import Heading from '@/components/Heading';
import {
  handlePasswordState,
  PasswordState,
  passwordValidReducer,
  passwordValidState,
} from '@/lib/passwordReducer';
import { useRouter } from 'next/navigation';
import { registerNewUser } from '@/lib/fetch/register';
import { Checkbox } from '@/components/ui/checkbox';

import checkImg from '/public/check.png';
import uncheckImg from '/public/uncheck.png';

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordState, setPasswordState] = useReducer(
    passwordValidReducer,
    passwordValidState
  );
  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });
  const {
    getFieldState,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const { isDirty } = getFieldState('password');

  const passwordWatch = watch('password');

  const onSubmit = async (values: RegisterSchema) => {
    const { data, error } = await registerNewUser(values);

    if (error) {
      return setError(error?.type as 'root', { message: error.message });
    }

    return router.push(`/register/${data.userId}`);
  };

  useEffect(() => {
    const result = registerSchema.shape.password.safeParse(passwordWatch);
    handlePasswordState(result, setPasswordState);
  }, [passwordWatch]);

  return (
    <div>
      <Heading size='lg'>Sign Up to Maia</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-y-4'
        >
          {errors.root && <p>{errors.root.message}</p>}
          <FormField
            control={form.control}
            name='name'
            disabled={isSubmitting}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Your Name'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
          {isDirty || errors.password ? (
            <PasswordMessage passwordErrors={passwordState} />
          ) : null}
          <Button
            type='submit'
            className='w-full mt-5'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading' : 'Sign Up'}
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
          Already have an account?{' '}
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

const PasswordMessage = ({ passwordErrors }: { passwordErrors: PasswordState }) => {
  const [errors, setErrors] = useState<{ error: boolean; message: string }[]>([]);

  useEffect(() => {
    const arr = Object.keys(passwordErrors).map((key) => {
      return passwordErrors[key];
    });

    setErrors(arr);
  }, [passwordErrors]);

  return (
    <div className='p-4 bg-[#FFF5F5] border-2 border-[#FBDFDF] rounded-md text-slate-500'>
      <ul className='space-y-4'>
        {errors.map((err, i) => (
          <li
            key={i}
            className='flex items-center gap-2 leading-3'
          >
            <Image
              src={err.error ? uncheckImg : checkImg}
              alt='check'
              width={16}
              height={16}
            />
            {err.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Register;
