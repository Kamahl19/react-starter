import { useMemo } from 'react';
import useSWR from 'swr';

import { post, patch } from 'common/apiClient';

import { createValidation } from './common';
import { emailRule } from './user';

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
 * Validations
 */

export const useLoginValidation = () =>
  useMemo(
    () =>
      createValidation<LoginPayload>({
        email: [emailRule],
        password: [{ required: true, type: 'string' }],
      }),
    []
  );

/**
 * Endpoints
 */

export const login = (payload: LoginPayload) => post<LoginResponse>('/auth/login', payload);

export const relogin = () => patch<LoginResponse>('/auth/relogin');

export const logout = () => post<LogoutResponse>('/auth/logout');

export const useFetchUserEmailAvailability = (email: string) => {
  const { data } = useSWR<UserEmailAvailabilityResponse>(
    /\S+@\S+\.\S+/u.test(email) ? `/auth/email-availability/${email}` : null
  );

  return data ?? true;
};
