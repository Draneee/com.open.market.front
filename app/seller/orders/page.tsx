import Image from 'next/image';
import React, { Suspense } from 'react';

export default function OrderPage() {
  return (
    <Suspense>
      <div className='w-full h-full flex items-center justify-center flex-col gap-6 animate'>
        <Image
          fill
          className='max-h-[43%]'
          src='https://res.cloudinary.com/dynscts1t/image/upload/v1710895154/g3cydxcfqkswfpgglqbp.svg'
          alt='Sketch person practicating yoga'
        />
        <h1 className='max-w-lg text-2xl text-balance text-center font-medium '>
          We are{' '}
          <span className='before:block before:absolute before:-inset-1 before:-skew-y-1 before:bg-black relative inline-block'>
            <span className='relative text-white'>working</span>
          </span>{' '}
          in this module; currently, the application are in{' '}
          <span className='before:block before:absolute before:-inset-1 before:skew-y-1 before:bg-black relative inline-block'>
            <span className='relative text-white'>demo version.</span>
          </span>{' '}
        </h1>
      </div>
    </Suspense>
  );
}
