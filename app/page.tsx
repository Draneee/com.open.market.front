import FitlersSection from '@/containers/home-page/filters-section';
import Navbar from '@/containers/home-page/navbar';
import Hero from '@/containers/home-page/hero';
import { getProductsMarketplace, getSession } from './actions/home';
import ProductsPosts from '@/containers/home-page/products-posts';
import DialogProduct from '@/containers/home-page/dialog-product';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Market',
  description:
    'Your Ultimate Marketplace Destination to can get the best offers.',
};
const INITIAL_NUMBER_OF_PRODUCTS = 10;

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialData = await getProductsMarketplace(
    0,
    INITIAL_NUMBER_OF_PRODUCTS,
    searchParams
  );
  const session = await getSession();
  console.log(initialData);
  return (
    <main className='flex flex-col items-center h-screen w-full gap-4'>
      <Navbar session={session} />
      <Hero />
      <section className='flex max-lg:flex-col w-full container gap-4 animate'>
        <DialogProduct />
        <FitlersSection session={session} maxPrice={initialData?.maxPrice} />
        <section className='flex-1 space-y-4'>
          <ProductsPosts
            session={session}
            initialProducts={initialData?.inventory}
            totalPagination={initialData?.total}
            searchParams={searchParams}
          />
        </section>
      </section>
    </main>
  );
}
