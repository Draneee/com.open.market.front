'use server';
import { cookies } from 'next/headers';
import { manageErrorsFetch } from './helpers/fetch-helpers';
import { manageErrorsFetchServer } from './helpers/fetch-helpers-server';
import { redirect } from 'next/navigation';

const updateHeader = (options: FetchOptions) => {
  const accessToken = cookies().get('openMarketToken')?.value;
  const token = `Bearer ${accessToken}`;
  const newHeaders = { Authorization: token };
  options.headers = { ...options.headers, ...newHeaders };
  return options;
};

// const handleSnackbar = (code: number) => {
//   const message = getValidationError(code);
//   if (message) SnackbarUtilities.error(message);
//   return message;
// };

const customFetchServer = async (
  url: string,
  options: FetchOptions,
  notToken = false
) => {
  if (url.includes('errorFetch')) return;
  try {
    options.headers = { 'Content-Type': 'application/json' };
    if (!url?.includes('notToken') && !notToken && options)
      options = updateHeader(options);

    const response = await fetch(url, options);

    console.log(response);
    if (!response.ok) throw response;

    return response;
  } catch (error) {
    // manageErrorsFetchServer(error);
    if (error instanceof Response) {
      if (error.status === 401) {
        // return redirect(urls.signin.path);
        console.log('401');
        redirect('?errorFetch=401');
      }

      if (error.status === 409) {
        // return redirect('/request-email-verification');
        console.log('409');
      }
    }
    return error as Response;
  }
};

export default customFetchServer;

export interface FetchOptions {
  method?: string;
  headers?: Headers | Record<string, string>;
  body?: BodyInit | null;
}
