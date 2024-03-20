import { redirect } from 'next/navigation';

export const manageErrorsFetchServer = (error: any) => {
  if (error instanceof Response) {
    console.log(error);
    if (error.status === 401) {
      // cookieStore.delete('openMarketToken');
      redirect('?errorFetch=401');
    }
  }
};
