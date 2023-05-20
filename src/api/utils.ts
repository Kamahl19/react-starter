import qs from 'query-string';
import is from '@sindresorhus/is';
import { type Status } from '@tshttp/status';
import { type ZodError } from 'zod';

import { getToken } from 'common/auth';

export type ApiError = {
  status: (typeof Status)[keyof typeof Status];
  message: string;
  details?: Record<string, string>;
};

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

export const isZodError = (e: unknown): e is ZodError =>
  is.nonEmptyObject(e) && e.name === 'ZodError';
