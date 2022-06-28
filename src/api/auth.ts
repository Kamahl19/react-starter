import useSWR from 'swr';

import { post, patch } from 'common/apiClient';

export type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  userId: string;
};

type LogoutResponse = boolean;

export const login = (payload: LoginPayload) => post<LoginResponse>('/auth/login', payload);

export const relogin = () => patch<LoginResponse>('/auth/relogin');

export const logout = () => post<LogoutResponse>('/auth/logout');

export const useFetchUserEmailAvailability = (email: string) => {
  const { data } = useSWR<boolean>(
    /\S+@\S+\.\S+/u.test(email) ? `/auth/email-availability/${email}` : null
  );

  return data ?? true;
};
