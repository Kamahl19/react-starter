import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { get, post, patch } from './client';
import { getURL, getAuthorizationHeader } from './common';

/**
 * Types
 */

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

export type UserEmailAvailabilityResponse = boolean;

/**
 * Constants
 */

export const PASSWORD_MIN_LENGTH = 6;

/**
 * Endpoints
 */

const fetchUserEmailAvailability = (email: string) =>
  get<UserEmailAvailabilityResponse>(getURL(`/user/email-availability/${email}`));

const createUser = (body: CreateUserPayload) =>
  post<UserResponse>(getURL('/user'), {
    headers: getAuthorizationHeader(),
    body,
  });

const confirmEmail = (token: string) =>
  patch<ConfirmEmailResponse>(getURL('/user/confirm-email'), {
    headers: getAuthorizationHeader(token),
  });

const fetchUser = (userId: string) =>
  get<UserResponse>(getURL(`/user/${userId}`), {
    headers: getAuthorizationHeader(),
  });

const changePassword = (userId: string, body: ChangePasswordPayload) =>
  patch<UserResponse>(getURL(`/user/${userId}/password`), {
    headers: getAuthorizationHeader(),
    body,
  });

const forgottenPassword = (body: ForgottenPasswordPayload) =>
  post<ForgottenPasswordResponse>(getURL('/user/forgot-password'), {
    headers: getAuthorizationHeader(),
    body,
  });

const resetPassword = (token: string, body: ResetPasswordPayload) =>
  patch<ResetPasswordResponse>(getURL('/user/reset-password'), {
    headers: getAuthorizationHeader(token),
    body,
  });

/**
 * Query keys
 */

export const userQueryKeys = {
  all: ['user'] as const,
  user: (userId: string) => [...userQueryKeys.all, userId] as const,
  emailAvailability: (email: string) => [...userQueryKeys.all, 'emailAvailability', email] as const,
};

/**
 * Hooks
 */

export const useFetchUserEmailAvailability = (email: string) =>
  useQuery({
    queryKey: userQueryKeys.emailAvailability(email),
    queryFn: () => fetchUserEmailAvailability(email),
    enabled: /\S+@\S+\.\S+/u.test(email),
    initialData: true,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKeys.emailAvailability(data.user.email), false);
    },
  });
};

export const useConfirmEmail = () =>
  useMutation({
    mutationFn: confirmEmail,
  });

export const useFetchUser = (userId: string) =>
  useQuery({
    queryKey: userQueryKeys.user(userId),
    queryFn: () => fetchUser(userId),
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

export const useForgottenPassword = () =>
  useMutation({
    mutationFn: forgottenPassword,
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ token, payload }: { token: string; payload: ResetPasswordPayload }) =>
      resetPassword(token, payload),
  });
