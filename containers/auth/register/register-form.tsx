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
import { registerSchema } from '@/lib/utils.seller';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import customFetchClient from '@/lib/custom-fetch-client';
import { API_URL } from '@/lib/const';
import { setCookie } from 'cookies-next';

export const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { email, password, nickname } = values;
    const res = await customFetchClient(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        nickname,
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
          name='nickname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input
                  placeholder='X Vendor'
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
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
      <Link href={'/auth/signin'} className='!mt-5 block mx-auto w-fit'>
        <p className='text-xs underline'>
          Already have an account? log in here!
        </p>
      </Link>
    </Form>
  );
};
