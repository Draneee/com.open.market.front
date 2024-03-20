'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { API_URL } from '@/lib/const';
import customFetchClient from '@/lib/custom-fetch-client';
import { GetItemsMarketplace } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const AdminFilters = ({ checkbox, setCheckbox }: IProps) => {
  const [seller, setSeller] = React.useState<GetItemsMarketplace[]>([]);
  React.useEffect(() => {
    const getSellers = async () => {
      try {
        const res = await customFetchClient(`${API_URL}/inventory/sellers`, {
          method: 'get',
        });

        const data = await res.json();
        setSeller(data);
      } catch (err) {}
    };

    getSellers();
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const sellersParam = params.getAll('sellers').map(Number);
  const handleSellers = (id: number) => {
    if (sellersParam.includes(id)) {
      const updatedSellers = sellersParam.filter((sellerId) => sellerId !== id);
      if (updatedSellers.length > 0) {
        params.set('sellers', updatedSellers.join(','));
      } else {
        params.delete('sellers');
      }
    } else {
      params.append('sellers', String(id));
    }
    router.replace('?' + params.toString());
  };

  return (
    <Suspense>
      <div>
        <span className='font-medium'>Sellers</span>
        <section className='flex flex-col gap-1'>
          {seller?.map((item: any) => (
            <label className='flex gap-2 items-center font-medium text-sm'>
              <Checkbox
                checked={checkbox[item.id] ?? false}
                defaultChecked={sellersParam.includes(item.id)}
                onCheckedChange={(e) => {
                  setCheckbox((p) => {
                    return {
                      ...p,
                      [item.id]: Boolean(e),
                    };
                  });
                  handleSellers(item.id);
                }}
              />
              {item.nickname}
            </label>
          ))}
        </section>
      </div>
    </Suspense>
  );
};

export default AdminFilters;

interface IProps {
  setCheckbox: React.Dispatch<
    React.SetStateAction<{
      [key: number]: boolean;
    }>
  >;
  checkbox: { [key: number]: boolean };
}
