'use client';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import { Inventory } from '@/types';
import { getProductsMarketplace } from '@/app/actions/home';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import CardSkeletonAdd from './card-skeleton';
import CardSkeleton from './card-skeleton';
import CardAdd from './card-add';
import CardProduct from './card-product';
const NUMBER_OF_USERS_TO_FETCH = 10;

const ProductsPosts = ({
  initialProducts,
  totalPagination,
  searchParams,
  session,
}: {
  initialProducts: Inventory[];
  totalPagination: number;
  searchParams: any;
  session: any;
}) => {
  const [offset, setOffset] = React.useState(NUMBER_OF_USERS_TO_FETCH);
  const [total, setTotal] = React.useState<number>(totalPagination);

  const [products, setProducts] = React.useState<Inventory[]>(initialProducts);
  const { ref, inView } = useInView();

  const loadMoreUsers = async () => {
    const apiUsers = await getProductsMarketplace(
      offset,
      NUMBER_OF_USERS_TO_FETCH,
      searchParams
    );
    setTotal(apiUsers.total);
    setProducts([...products, ...apiUsers.inventory]);
    setOffset(offset + NUMBER_OF_USERS_TO_FETCH);
  };
  const reachedEnd =
    new URLSearchParams(searchParams).size === 0
      ? products?.length >= total
      : true;

  React.useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView]);

  React.useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  return (
    <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10'>
      {products?.map((itm) => (
        <CardProduct key={itm.id} {...itm} />
      ))}
      {reachedEnd ? (
        <CardAdd session={session} />
      ) : (
        <CardSkeleton refProp={ref} />
      )}
    </div>
  );
};

export default ProductsPosts;
