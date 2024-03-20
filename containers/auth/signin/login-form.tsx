'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { loginSchema } from '@/lib/utils.seller';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/lib/const';
import { setCookie } from 'cookies-next';
import customFetchClient from '@/lib/custom-fetch-client';

export const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;
    const res = await customFetchClient(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const resFormated = await res.json();
    if (!res.ok) {
      toast.error(resFormated.message);
      return;
    }
    setCookie('openMarketToken', resFormated.result.token, {
      path: '/',
    });
    toast.success('Login succesfully!');
    form.reset();
    router.push('/seller/inventory?skip=0&limit=12');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='email@domain.com'
                  disabled={form.formState.isSubmitting}
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder='*******'
                  type='password'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full !mt-6'
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
      <Link href={'/auth/register'} className='!mt-5 block mx-auto w-fit'>
        <p className='text-xs underline'>
          Don't have an account yet, register here!
        </p>
      </Link>
    </Form>
  );
};
