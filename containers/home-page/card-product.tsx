import { Inventory } from '@/types';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const CardProduct = (itm: Inventory) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const handleInfoModal = () => {
    if (params.has('product')) params.delete('product');
    else params.append('product', String(itm.id));

    router.push('?' + params.toString(), {
      scroll: false,
    });
  };
  return (
    <Suspense>
      <article
        onClick={handleInfoModal}
        key={itm.id}
        className='p-3 rounded border group cursor-pointer hover:-translate-y-2 transition'
      >
        <section className='bg-gray-200 aspect-square w-full rounded relative overflow-hidden'>
          <Image
            src={itm.pictureUrl}
            alt={itm.productName}
            className='w-full h-full object-cover object-center'
            fill
          />
        </section>
        <section className='text-center'>
          <h6 className='text-xl font-medium'>{itm.productName}</h6>
          <p className='text-black/40 font-normal -mt-0.5 font- text-base'>
            $ {itm.price.toLocaleString()}
          </p>
          <p className='text-xs w-full text-end text-black/30 mt-0'>
            {itm.SKU}
          </p>
        </section>
      </article>
    </Suspense>
  );
};

export default CardProduct;
