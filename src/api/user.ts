import { useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

import { get, post, patch } from './client';
import { getURL, getAuthorizationHeader, createValidation } from './common';

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

/**
 * Constants
 */

export const PASSWORD_MIN_LENGTH = 6;

/**
 * Validations
 */

export const emailRule = { required: true, type: 'email' } as const;

export const passwordRule = { required: true, type: 'string', min: PASSWORD_MIN_LENGTH } as const;

export const useCreateUserValidation = () =>
  useMemo(
    () =>
      createValidation<CreateUserPayload>({
        email: [emailRule],
        password: [passwordRule],
      }),
    []
  );

export const useForgottenPasswordValidation = () =>
  useMemo(
    () =>
      createValidation<ForgottenPasswordPayload>({
        email: [emailRule],
      }),
    []
  );

export const useChangePasswordValidation = () =>
  useMemo(
    () =>
      createValidation<ChangePasswordPayload>({
        currentPassword: [{ ...passwordRule, min: undefined }],
        password: [passwordRule],
      }),
    []
  );

export const useResetPasswordValidation = () =>
  useMemo(
    () =>
      createValidation<ResetPasswordPayload>({
        password: [passwordRule],
      }),
    []
  );

/**
 * Endpoints
 */

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
 * Hooks
 */

export const useCreateUser = () => useMutation(createUser);

export const useConfirmEmail = () => useMutation(confirmEmail);

export const useFetchUser = (userId: string) => useQuery(['user', userId], () => fetchUser(userId));

export const useChangePassword = () =>
  useMutation(({ userId, payload }: { userId: string; payload: ChangePasswordPayload }) =>
    changePassword(userId, payload)
  );

export const useForgottenPassword = () => useMutation(forgottenPassword);

export const useResetPassword = () =>
  useMutation(({ token, payload }: { token: string; payload: ResetPasswordPayload }) =>
    resetPassword(token, payload)
  );
