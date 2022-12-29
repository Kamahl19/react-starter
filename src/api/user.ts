import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { get, post, patch } from './client';
import { getURL, getAuthorizationHeader, type QueryContextFromKeys } from './common';

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

const fetchUserEmailAvailability = ({
  queryKey: [{ email }],
}: QueryContextFromKeys<typeof userQueryKeys>['emailAvailability']) =>
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

const fetchUser = ({
  queryKey: [{ userId }],
}: QueryContextFromKeys<typeof userQueryKeys>['user']) =>
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
  all: [{ scope: 'users' }] as const,
  user: (userId: string) => [{ ...userQueryKeys.all[0], entity: 'user', userId }] as const,
  emailAvailability: (email: string) =>
    [{ ...userQueryKeys.all[0], entity: 'emailAvailability', email }] as const,
};

/**
 * Hooks
 */

export const useFetchUserEmailAvailability = (email: string) =>
  useQuery({
    queryKey: userQueryKeys.emailAvailability(email),
    queryFn: fetchUserEmailAvailability,
    enabled: /\S+@\S+\.\S+/u.test(email),
    initialData: true,
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKeys.emailAvailability(data.user.email), false);
    },
  });
};

export const useConfirmEmail = () => useMutation(confirmEmail);

export const useFetchUser = (userId: string) =>
  useQuery({
    queryKey: userQueryKeys.user(userId),
    queryFn: fetchUser,
  });

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ userId, payload }: { userId: string; payload: ChangePasswordPayload }) =>
      changePassword(userId, payload),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(userQueryKeys.user(data.user.id), data);
      },
    }
  );
};

export const useForgottenPassword = () => useMutation(forgottenPassword);

export const useResetPassword = () =>
  useMutation(({ token, payload }: { token: string; payload: ResetPasswordPayload }) =>
    resetPassword(token, payload)
  );
