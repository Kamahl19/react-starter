import { useMemo } from 'react';
import useSWR from 'swr';

import { useIsLoading } from 'common/hooks';
import { post, patch } from 'common/apiClient';

export type User = {
  id: string;
  email: string;
  isConfirmed: boolean;
};

export type CreateUserPayload = {
  email: string;
  password: string;
};

export type ChangePasswordPayload = {
  password: string;
  currentPassword: string;
};

type UserResponse = {
  user: User;
};

export type ForgottenPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  password: string;
};

export const useCreateUser = () => {
  const { isLoading, wrap } = useIsLoading('user.createUser');

  return useMemo(
    () => ({
      isLoading,
      createUser: async (payload: CreateUserPayload) => wrap(post<UserResponse>('/user', payload)),
    }),
    [wrap, isLoading]
  );
};

export const useConfirmEmail = (token: string) => {
  const { isLoading, wrap } = useIsLoading('user.confirmEmail');

  return useMemo(
    () => ({
      isLoading,
      confirmEmail: async () => wrap(patch<boolean>(`/user/confirm-email/${token}`)),
    }),
    [wrap, isLoading, token]
  );
};

export const useFetchUser = (userId: string) => {
  const { data, isValidating, mutate } = useSWR<UserResponse>(`/user/${userId}`);

  return useMemo(
    () => ({
      user: data?.user,
      isLoading: isValidating,
      mutate,
    }),
    [data, isValidating, mutate]
  );
};

export const useChangePassword = (userId: string) => {
  const { isLoading, wrap } = useIsLoading('user.changePassword');

  return useMemo(
    () => ({
      isLoading,
      changePassword: async (payload: ChangePasswordPayload) =>
        wrap(patch<UserResponse>(`/user/${userId}/password`, payload)),
    }),
    [wrap, isLoading, userId]
  );
};

export const useForgottenPassword = () => {
  const { isLoading, wrap } = useIsLoading('user.forgottenPassword');

  return useMemo(
    () => ({
      isLoading,
      forgottenPassword: async (payload: ForgottenPasswordPayload) =>
        wrap(post<boolean>('/user/forgot-password', payload)),
    }),
    [wrap, isLoading]
  );
};

export const useResetPassword = (token: string) => {
  const { isLoading, wrap } = useIsLoading('user.resetPassword');

  return useMemo(
    () => ({
      isLoading,
      resetPassword: async (payload: ResetPasswordPayload) =>
        wrap(patch<boolean>('/user/reset-password', { ...payload, token })),
    }),
    [wrap, isLoading, token]
  );
};
