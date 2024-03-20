import { TypeGetItemsMarketplace } from '@/types';
import { API_URL } from './const';
import customFetchServer from './custom-fetch-server';

export const getItemsMarketplace = async (
  offset: number,
  limit: number,
  searchParams: any
) => {
  const params = new URLSearchParams(searchParams);
  const res = (await customFetchServer(
    `${API_URL}/inventory/marketplace?skip=${offset}&limit=${limit}&${params.toString()}`,
    {
      method: 'get',
    }
  ).then((res) => res?.json())) as TypeGetItemsMarketplace;

  return res;
};
