import { useQuery } from '@tanstack/react-query';

import { get, post, patch } from './client';
import { getURL, getAuthorizationHeader } from './common';

/**
 * Types
 */

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  userId: string;
};

export type LogoutResponse = boolean;

export type UserEmailAvailabilityResponse = boolean;

/**
 * Endpoints
 */

export const login = (body: LoginPayload) =>
  post<LoginResponse>(getURL('/auth/login'), {
    body,
  });

export const relogin = () =>
  patch<LoginResponse>(getURL('/auth/relogin'), {
    headers: getAuthorizationHeader(),
  });

export const logout = () =>
  post<LogoutResponse>(getURL('/auth/logout'), {
    headers: getAuthorizationHeader(),
  });

const fetchUserEmailAvailability = (email: string) =>
  get<UserEmailAvailabilityResponse>(getURL(`/auth/email-availability/${email}`));

/**
 * Hooks
 */

export const useFetchUserEmailAvailability = (email: string) =>
  useQuery(['auth', 'email-availability', email], () => fetchUserEmailAvailability(email), {
    enabled: /\S+@\S+\.\S+/u.test(email),
    initialData: true,
  });
