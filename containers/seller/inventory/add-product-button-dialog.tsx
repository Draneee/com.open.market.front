'use client';
import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { CardStackPlusIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';

const AddProductButtonDialog = () => {
  const router = useRouter();
  const serachParams = useSearchParams();
  const params = new URLSearchParams(serachParams);
  const switchModalParam = () => {
    if (params.has('Add')) params.delete('Add');
    else params.append('Add', String(true));
    router.push('?' + params.toString());
  };
  return (
    <Suspense>
      <Button
        size={'sm'}
        className='font-mono group'
        onClick={switchModalParam}
      >
        Add Product
        <span className='group-hover:w-4 w-0 transition-all group-hover:translate-x-0 -translate-x-10 group-hover:ms-2'>
          <CardStackPlusIcon className='group-hover:opacity-100 opacity-0 transition-all' />
        </span>
      </Button>
    </Suspense>
  );
};

export default AddProductButtonDialog;
