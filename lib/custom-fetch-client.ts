import { FetchOptions } from './custom-fetch-server';
import { getCookieApp } from './helpers/fetch-helpers';

const customFetchClient = async (
  url: string,
  options: FetchOptions,
  notToken = false
) => {
  try {
    const session = getCookieApp();
    const accessToken = session;
    console.log(url);
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    if (error instanceof Response) {
      // manageErrorsFetch
    }
    return error as Response;
  }
};

export default customFetchClient;
