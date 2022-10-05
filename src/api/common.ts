import qs from 'query-string';
import is from '@sindresorhus/is';

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
  is.number((e as ApiError).status) &&
  is.string((e as ApiError).message) &&
  (is.undefined((e as ApiError).details) ||
    is.nonEmptyObject<string, string>((e as ApiError).details));

export const handleApiError = (handler: (error: string) => void) => (error: unknown) => {
  if (isApiError(error)) {
    if (error.details) {
      for (const [, detail] of Object.entries(error.details)) {
        handler(detail);
      }
    } else {
      handler(error.message);
    }
  }
};
