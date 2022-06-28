import { type SWRConfiguration, type Middleware, type Key } from 'swr';
import { message } from 'antd';

import { type ErrorResponse, type ApiError } from 'api';
import { useAuth } from 'common/auth';
import { buildURL } from 'common/apiClient';
import { t } from 'common/i18next';

const fetcher = async <Data>(url: string, token?: string): Promise<Data> => {
  const init = {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };

  if (import.meta.env.DEV) {
    console.log('SWR Request:', { url, init });
  }

  const resp = await fetch(url, init);

  if (!resp.ok) {
    const { error }: ErrorResponse = await resp.json();
    throw error;
  }

  return resp.json();
};

const onError = (err: Error | ApiError) => {
  message.error(t('api.apiError', { defaultValue: 'An error occurred' }) + `: ${err.message}`);
};

const normalizeKey = (k: Key) => {
  const key = typeof k === 'function' ? k() : k;
  return key === null ? null : Array.isArray(key) ? key : [key];
};

const urlMiddleware: Middleware = (useSWRNext) => (k, fetcher, config) => {
  const key = normalizeKey(k);

  if (!key) {
    return useSWRNext(key, fetcher, config);
  }

  const [path, params, token] = key;

  return useSWRNext([buildURL(path, params), token], fetcher, config);
};

const authMiddleware: Middleware = (useSWRNext) => (k, fetcher, config) => {
  const { token: authToken } = useAuth();

  const key = normalizeKey(k);

  if (!key) {
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
