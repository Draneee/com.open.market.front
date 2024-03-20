import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const CardSkeleton = (props: any) => {
  return (
    <article className='p-3 rounded border border-dashed' ref={props.refProp}>
      <section className='aspect-square w-full rounded relative overflow-hidden'>
        <Skeleton className='w-full h-full' />
      </section>
      <section className='text-center'>
        <h6 className='text-lg font-medium'>
          <Skeleton className='w-36 h-5 mx-auto my-1' />
        </h6>
        <div className='text-black/40 font-normal text-base'>
          <Skeleton className='w-16 h-4 mx-auto' />
        </div>
        <div className='text-xs flex items-end justify-end w-full text-end text-black/30 mt-0'>
          <Skeleton className='h-3 w-12' />
        </div>
      </section>
    </article>
  );
};

export default CardSkeleton;
