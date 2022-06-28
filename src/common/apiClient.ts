import qs from 'query-string';

import { type ErrorResponse } from 'api';
import { getToken } from 'common/auth';

type Init = Omit<RequestInit, 'body'> & {
  params?: Record<string, unknown>;
  token?: string;
  body?: unknown;
};

const apiClient = async <R>(
  path: string,
  { body, headers, params, token, ...customInit }: Init = {}
): Promise<R> => {
  const authToken = token ?? getToken();

  const init = {
    ...customInit,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : undefined),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : undefined),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const url = buildURL(path, params);

  if (import.meta.env.DEV) {
    console.log('ApiClient Request:', { url, init });
  }

  const resp = await fetch(url, init);

  const data = await resp.json();

  if (!resp.ok) {
    const { error } = data as ErrorResponse;

    throw error;
  }

  return data;
};

export const buildURL = (path: string, params?: Record<string, unknown>) =>
  import.meta.env.VITE_API_URL +
  path +
  (params && Object.keys(params).length ? `?${qs.stringify(params)}` : '');

export const get = <R = unknown>(path: string, init?: Init) =>
  apiClient<R>(path, { ...init, method: 'GET' });

export const post = <R = unknown>(path: string, body?: unknown, init?: Init) =>
  apiClient<R>(path, { ...init, method: 'POST', body });

export const put = <R = unknown>(path: string, body?: unknown, init?: Init) =>
  apiClient<R>(path, { ...init, method: 'PUT', body });

export const patch = <R = unknown>(path: string, body?: unknown, init?: Init) =>
  apiClient<R>(path, { ...init, method: 'PATCH', body });

export const del = <R = unknown>(path: string, init?: Init) =>
  apiClient<R>(path, { ...init, method: 'DELETE' });
