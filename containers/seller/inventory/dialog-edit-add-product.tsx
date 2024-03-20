'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CardStackPlusIcon } from '@radix-ui/react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { Inventory } from '@/types';
import AddProductForm from './add-product-form';

const DialogEditAddProduct = ({ data }: { data?: Inventory[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const AddOrEdit = searchParams.has('Add')
    ? 'Add'
    : searchParams.has('Edit')
    ? 'Edit'
    : undefined;

  if (!AddOrEdit) return;

  const isOpen = searchParams.has(AddOrEdit);
  const params = new URLSearchParams(searchParams);
  const id = Number(searchParams.get(AddOrEdit));
  const ItemSelected =
    AddOrEdit === 'Add' ? undefined : data?.find((item) => item.id === id);

  const deleteParam = () => {
    params.delete(AddOrEdit);
    router.push('?' + params.toString());
  };

  return (
    <Dialog onOpenChange={deleteParam} open={isOpen}>
      <DialogTrigger asChild>
        <Button size={'sm'} className='font-mono group'>
          Add Product
          <span className='group-hover:w-4 w-0 transition-all group-hover:translate-x-0 -translate-x-10 group-hover:ms-2'>
            <CardStackPlusIcon className='group-hover:opacity-100 opacity-0 transition-all' />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{AddOrEdit} Product</DialogTitle>
          <DialogDescription>
            {AddOrEdit === 'Add' ? 'Create New Item' : 'Refine Product Details'}
          </DialogDescription>
        </DialogHeader>
        <AddProductForm
          onOpenChange={deleteParam}
          itemSelected={ItemSelected}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditAddProduct;
