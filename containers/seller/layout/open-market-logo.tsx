import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const OpenMarketLogo = ({ className }: { className?: string }) => {
  return (
    <Link href={'/'} className={cn('flex gap-2 opacity-70', className)}>
      <h2 className='leading-4 text-right pe-1 font-normal'>
        Open <br /> Market
      </h2>
      <Separator orientation='vertical' className='h-8' />
      <img
        className='size-[2.15rem]'
        src='https://res.cloudinary.com/dynscts1t/image/upload/v1710035278/logo-adrian_bul6an.svg'
        alt='Logo Adrian'
      />
    </Link>
  );
};

export default OpenMarketLogo;
