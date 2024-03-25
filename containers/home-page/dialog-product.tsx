'use client';
import React, { Suspense } from 'react';
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
import customFetchClient from '@/lib/custom-fetch-client';
import { API_URL } from '@/lib/const';
import { Inventory } from '@/types';
import Image from 'next/image';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
interface InventoryWithOwner extends Inventory {
  owner: {
    email: string;
  };
}
const DialogProduct = () => {
  const [product, setProduct] = React.useState<InventoryWithOwner>();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const id = params.get('product');
  const deleteParam = () => {
    params.delete('product');
    router.push('?' + params.toString(), {
      scroll: false,
    });
  };

  const isOpen = searchParams.has('product');

  React.useEffect(() => {
    if (id) {
      const getProduct = async () => {
        setLoading(true);
        try {
          const res = await customFetchClient(`${API_URL}/inventory/${id}`, {
            method: 'GET',
          });
          const data = await res.json();
          setProduct(data);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      };

      getProduct();
    }
  }, [id]);

  const handleContactSeller = () => {
    if (product) {
      const sellerInfo = `Contact seller for product: ${product.productName}, SKU: ${product.SKU} \n${product.owner.email}`;
      copyToClipboard(sellerInfo);
      toast.success('The email of seller are copy!');
    }
  };

  return (
    <Suspense>
      <Dialog onOpenChange={deleteParam} open={isOpen}>
        <DialogContent>
          <DialogHeader>
            {loading ? (
              <div className='flex items-end gap-1'>
                <Skeleton className='h-8 w-40' />
                <Skeleton className='h-4 w-20' />
              </div>
            ) : (
              <DialogTitle className='text-2xl'>
                {product?.productName}{' '}
                <span className='text-xs text-muted-foreground'>
                  {product?.SKU}
                </span>
              </DialogTitle>
            )}

            <DialogDescription className='space-y-2'>
              <div className='aspect-square relative rounded overflow-hidden'>
                {loading ? (
                  <Skeleton className='size-full' />
                ) : (
                  <Image
                    className='size-full object-cover object-center'
                    src={product?.pictureUrl ?? ''}
                    alt={product?.productName ?? ''}
                    fill
                  />
                )}
              </div>
              <section>
                {loading ? (
                  <Skeleton className='h-3 w-16 mx-auto' />
                ) : (
                  <p className='text-center text-xs leading-3'>
                    Avaibles: {product?.quantity}
                  </p>
                )}
                {loading ? (
                  <Skeleton className='h-5 w-28 mx-auto mt-1' />
                ) : (
                  <div className='text-xl text-black text-center w-full font-medium'>
                    $ {product?.price?.toLocaleString()}.00
                  </div>
                )}
              </section>
              <section className='text-center'>
                Do yo like this product? Contact with the seller to buy
              </section>
              <Button className='w-full' onClick={handleContactSeller}>
                Contact with the seller
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};

export default DialogProduct;
