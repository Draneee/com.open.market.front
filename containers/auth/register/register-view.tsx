import React from 'react';
import { Separator } from '@/components/ui/separator';
import { RegisterForm } from './register-form';

const RegisterView = () => {
  return (
    <section className='w-full space-y-8'>
      <section className='flex justify-center px-4 gap-4'>
        <h1 className='text-2xl font-medium max-w-32 text-right'>
          Register Marketplace
        </h1>
        <Separator orientation='vertical' className='h-16' />
        <img
          className='size-auto max-w-16'
          src='https://res.cloudinary.com/dynscts1t/image/upload/v1710035278/logo-adrian_bul6an.svg'
          alt='Logo Adrian'
        />
      </section>
      <RegisterForm />
    </section>
  );
};

export default RegisterView;
