import { redirect } from 'next/navigation';
import { deleteCookie, getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const getCookieApp = () => getCookie('openMarketToken');

export const deleteCookieApp = () =>
  deleteCookie('openMarketToken', {
    path: '/',
  });

export const manageErrorsFetch = (error: any) => {
  if (error instanceof Response) {
    console.log(error);
    if (error.status === 401) {
      redirect('/auth/signin');
    }
  }
};
