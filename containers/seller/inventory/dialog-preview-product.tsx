'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Inventory } from '@/types';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const DialogPreviewProduct = ({ data }: { data: Inventory[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.has('Preview');
  const params = new URLSearchParams(searchParams);
  const deleteParam = () => {
    params.delete('Preview');
    router.push('?' + params.toString());
  };
  const id = Number(params.get('Preview'));
  const ItemSelected = data?.find((itm) => itm.id === id);
  return (
    <Suspense>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='flex justify-between'>
              <section>
                {ItemSelected?.productName}{' '}
                <span className='text-xs text-muted-foreground font-normal'>
                  {ItemSelected?.SKU} / Qty: {ItemSelected?.quantity}und
                </span>
              </section>
              <section>$ {ItemSelected?.price.toLocaleString()} </section>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className='aspect-square rounded-md overflow-hidden relative'>
                <Image
                  className='object-cover w-full h-full'
                  src={ItemSelected?.pictureUrl ?? ''}
                  alt={ItemSelected?.productName ?? ''}
                  fill
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={deleteParam}>Return</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Suspense>
  );
};

export default DialogPreviewProduct;
