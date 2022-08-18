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

export type UserResponse = {
  user: User;
};

export type ConfirmEmailResponse = boolean;

export type ForgottenPasswordPayload = {
  email: string;
};

export type ForgottenPasswordResponse = boolean;

export type ResetPasswordPayload = {
  password: string;
};

export type ResetPasswordResponse = boolean;

export const useCreateUser = () => {
  const { isLoading, startLoading, stopLoading } = useIsLoading('user.createUser');

  return useMemo(
    () => ({
      isLoading,
      createUser: async (payload: CreateUserPayload) => {
        try {
          await startLoading();
          return await post<UserResponse>('/user', payload);
        } finally {
          await stopLoading();
        }
      },
    }),
    [isLoading, startLoading, stopLoading]
  );
};

export const useConfirmEmail = (token: string) => {
  const { isLoading, startLoading, stopLoading } = useIsLoading('user.confirmEmail');

  return useMemo(
    () => ({
      isLoading,
      confirmEmail: async () => {
        try {
          await startLoading();
          return await patch<ConfirmEmailResponse>(`/user/confirm-email/${token}`);
        } finally {
          await stopLoading();
        }
      },
    }),
    [isLoading, startLoading, stopLoading, token]
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
  const { isLoading, startLoading, stopLoading } = useIsLoading('user.changePassword');

  return useMemo(
    () => ({
      isLoading,
      changePassword: async (payload: ChangePasswordPayload) => {
        try {
          await startLoading();
          return await patch<UserResponse>(`/user/${userId}/password`, payload);
        } finally {
          await stopLoading();
        }
      },
    }),
    [isLoading, startLoading, stopLoading, userId]
  );
};

export const useForgottenPassword = () => {
  const { isLoading, startLoading, stopLoading } = useIsLoading('user.forgottenPassword');

  return useMemo(
    () => ({
      isLoading,
      forgottenPassword: async (payload: ForgottenPasswordPayload) => {
        try {
          await startLoading();
          return await post<ForgottenPasswordResponse>('/user/forgot-password', payload);
        } finally {
          await stopLoading();
        }
      },
    }),
    [isLoading, startLoading, stopLoading]
  );
};

export const useResetPassword = (token: string) => {
  const { isLoading, startLoading, stopLoading } = useIsLoading('user.resetPassword');

  return useMemo(
    () => ({
      isLoading,
      resetPassword: async (payload: ResetPasswordPayload) => {
        try {
          await startLoading();
          return await patch<ResetPasswordResponse>('/user/reset-password', { ...payload, token });
        } finally {
          await stopLoading();
        }
      },
    }),
    [isLoading, startLoading, stopLoading, token]
  );
};
