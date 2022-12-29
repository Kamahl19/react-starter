import qs from 'query-string';
import is from '@sindresorhus/is';
import { type QueryKey, type QueryFunctionContext } from '@tanstack/react-query';

import { getToken } from 'common/auth';

/**
 * Types
 */

export type ApiError = {
  status: number;
  message: string;
  details?: Record<string, string>;
};

/**
 * Utils
 */

export const getURL = (path: string, params?: Record<string, unknown>) =>
  import.meta.env.VITE_API_URL +
  path +
  (params && Object.keys(params).length > 0 ? `?${qs.stringify(params)}` : '');

export const getAuthorizationHeader = (token?: string) => {
  const t = token ?? getToken();
  return t ? { Authorization: `Bearer ${t}` } : undefined;
};

export const isApiError = (e: unknown): e is ApiError =>
  is.nonEmptyObject(e) &&
  is.number(e.status) &&
  is.string(e.message) &&
  (is.undefined(e.details) || is.nonEmptyObject<string, string>(e.details));

export type QueryContextFromKeys<
  KeyFactory extends Record<string, QueryKey | ((...args: any[]) => QueryKey)> // eslint-disable-line @typescript-eslint/no-explicit-any
> = {
  [K in keyof KeyFactory]: KeyFactory[K] extends (...args: any[]) => QueryKey // eslint-disable-line @typescript-eslint/no-explicit-any
    ? QueryFunctionContext<ReturnType<KeyFactory[K]>>
    : KeyFactory[K] extends QueryKey
    ? QueryFunctionContext<KeyFactory[K]>
    : never;
};
