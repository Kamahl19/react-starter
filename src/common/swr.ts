import { type SWRConfiguration, type Middleware, type Key, type Arguments } from 'swr';
import { message } from 'antd';

import { type ErrorResponse, type ApiError } from 'api';
import { useAuth } from 'common/auth';
import { buildURL } from 'common/apiClient';

const fetcher = async <Data>(url: string, token?: string): Promise<Data> => {
  const init = {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };

  if (import.meta.env.DEV) {
    console.log('SWR Request:', { url, init });
  }

  const resp = await fetch(url, init);

  const data = (await resp.json()) as Data | ErrorResponse;

  if (!resp.ok) {
    const { error } = data as ErrorResponse;
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error;
  }

  return data as Data;
};

const onError = (err: Error | ApiError) => {
  void message.error(err.message);
};

const keyIsFalsy = (key: unknown): key is null | undefined | false =>
  key === null || key === undefined || key === false;

const normalizeKey = (k: Key) => {
  const key = typeof k === 'function' ? (k() as Arguments) : k;

  return keyIsFalsy(key) || Array.isArray(key) ? key : [key];
};

const urlMiddleware: Middleware = (useSWRNext) => (k, fetcher, config) => {
  const key = normalizeKey(k);

  if (keyIsFalsy(key)) {
    return useSWRNext(key, fetcher, config);
  }

  const [path, params, token] = key as [
    string,
    Record<string, unknown> | undefined,
    string | undefined
  ];

  return useSWRNext([buildURL(path, params), token], fetcher, config);
};

const authMiddleware: Middleware = (useSWRNext) => (k, fetcher, config) => {
  const { token: authToken } = useAuth();

  const key = normalizeKey(k);

  if (keyIsFalsy(key)) {
    return useSWRNext(key, fetcher, config);
  }

  const [path, token = authToken] = key;

  return useSWRNext([path, token], fetcher, config);
};

export const swrConfig: SWRConfiguration = {
  fetcher,
  onError,
  use: [urlMiddleware, authMiddleware],
  revalidateOnMount: true,
  revalidateOnFocus: false,
};
