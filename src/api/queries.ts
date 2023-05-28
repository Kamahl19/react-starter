import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchUser,
  createUser,
  changePassword,
  resetPassword,
  fetchUserEmailAvailability,
  confirmEmail,
} from './endpoints';
import type { CreateUserPayload, ChangePasswordPayload, ResetPasswordPayload } from './models';

/**
 * User
 */

const userQueryKeys = {
  all: ['user'] as const,
  user: (userId: string) => [...userQueryKeys.all, userId] as const,
  emailAvailability: (email: string) => [...userQueryKeys.all, 'emailAvailability', email] as const,
};

export const useFetchUser = (userId: string) =>
  useQuery({
    queryKey: userQueryKeys.user(userId),
    queryFn: () => fetchUser(userId),
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKeys.emailAvailability(data.user.email), false);
    },
  });
};

export const useConfirmEmail = () =>
  useMutation({
    mutationFn: (token: string) => confirmEmail(token),
  });

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: ChangePasswordPayload }) =>
      changePassword(userId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKeys.user(data.user.id), data);
    },
  });
};

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ payload, redirectTo }: { payload: ResetPasswordPayload; redirectTo: string }) =>
      resetPassword(payload, redirectTo),
  });

export const useFetchUserEmailAvailability = (email: string) =>
  useQuery({
    queryKey: userQueryKeys.emailAvailability(email),
    queryFn: () => fetchUserEmailAvailability(email),
    enabled: /\S+@\S+\.\S+/u.test(email),
    initialData: true,
  });
