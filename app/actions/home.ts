'use server';

import { API_URL } from '@/lib/const';
import customFetchServer from '@/lib/custom-fetch-server';
import { cookies } from 'next/headers';
export const getProductsMarketplace = async (
  offset: number,
  limit: number,
  searchParams: any
) => {
  const params = new URLSearchParams(searchParams);
  const res = await customFetchServer(
    `${API_URL}/inventory/marketplace?skip=${offset}&limit=${limit}&${params.toString()}`,
    {
      method: 'get',
    }
  );
  if (!res?.ok) return;
  const data = await res?.json();
  return data;
};

export const getSession = async () => {
  try {
    const accessToken = cookies().get('openMarketToken')?.value;
    const token = `Bearer ${accessToken}`;
    const res = await fetch(`${API_URL}/auth/validate-session`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (!res.ok) throw Error;

    const data = await res?.json();
    return data;
  } catch (err) {
    if (err instanceof Response) {
      const data = await err.json();
      return data;
    }
  }
};
