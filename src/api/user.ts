import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { get, post, patch } from './client';
import { getURL, getAuthorizationHeader } from './common';

/**
 * Constants
 */

export const PASSWORD_MIN_LENGTH = 6;

/**
 * Schemas
 */

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  isConfirmed: z.boolean(),
});

export const createUserPayloadSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const changePasswordPayloadSchema = z.object({
  password: z.string(),
  currentPassword: z.string(),
});

export const userResponseSchema = z.object({
  user: userSchema,
});

export const confirmEmailResponseSchema = z.boolean();

export const forgottenPasswordPayloadSchema = z.object({
  email: z.string(),
});

export const forgottenPasswordResponseSchema = z.boolean();

export const resetPasswordPayloadSchema = z.object({
  password: z.string(),
});

export const resetPasswordResponseSchema = z.boolean();

export const userEmailAvailabilityResponseSchema = z.boolean();

/**
 * Types
 */

export type User = z.infer<typeof userSchema>;
export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;
export type ChangePasswordPayload = z.infer<typeof changePasswordPayloadSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type ConfirmEmailResponse = z.infer<typeof confirmEmailResponseSchema>;
export type ForgottenPasswordPayload = z.infer<typeof forgottenPasswordPayloadSchema>;
export type ForgottenPasswordResponse = z.infer<typeof forgottenPasswordResponseSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordPayloadSchema>;
export type ResetPasswordResponse = z.infer<typeof resetPasswordResponseSchema>;
export type UserEmailAvailabilityResponse = z.infer<typeof userEmailAvailabilityResponseSchema>;

/**
 * Endpoints
 */

const fetchUserEmailAvailability = (email: string) =>
  get(userEmailAvailabilityResponseSchema, getURL(`/user/email-availability/${email}`));

const createUser = (body: CreateUserPayload) =>
  post(userResponseSchema, getURL('/user'), {
    headers: getAuthorizationHeader(),
    body,
  });

const confirmEmail = (token: string) =>
  patch(confirmEmailResponseSchema, getURL('/user/confirm-email'), {
    headers: getAuthorizationHeader(token),
  });

const fetchUser = (userId: string) =>
  get(userResponseSchema, getURL(`/user/${userId}`), {
    headers: getAuthorizationHeader(),
  });

const changePassword = (userId: string, body: ChangePasswordPayload) =>
  patch(userResponseSchema, getURL(`/user/${userId}/password`), {
    headers: getAuthorizationHeader(),
    body,
  });

const forgottenPassword = (body: ForgottenPasswordPayload) =>
  post(forgottenPasswordResponseSchema, getURL('/user/forgot-password'), {
    headers: getAuthorizationHeader(),
    body,
  });

const resetPassword = (token: string, body: ResetPasswordPayload) =>
  patch(resetPasswordResponseSchema, getURL('/user/reset-password'), {
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
