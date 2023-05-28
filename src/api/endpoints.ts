import { get, post, patch } from './client';
import { getURL, getAuthorizationHeader } from './utils';
import {
  signInResponseSchema,
  signOutResponseSchema,
  userResponseSchema,
  userEmailAvailabilityResponseSchema,
  confirmEmailResponseSchema,
  resetPasswordResponseSchema,
} from './models';
import type {
  SignInPayload,
  CreateUserPayload,
  ChangePasswordPayload,
  ResetPasswordPayload,
} from './models';

/**
 * Auth
 */

export const signIn = (body: SignInPayload) =>
  post(signInResponseSchema, getURL('/auth/sign-in'), {
    body,
  });

export const relogin = () =>
  patch(signInResponseSchema, getURL('/auth/relogin'), {
    headers: getAuthorizationHeader(),
  });

export const signOut = () =>
  post(signOutResponseSchema, getURL('/auth/sign-out'), {
    headers: getAuthorizationHeader(),
  });

/**
 * User
 */

export const fetchUserEmailAvailability = (email: string) =>
  get(userEmailAvailabilityResponseSchema, getURL(`/user/email-availability/${email}`));

export const createUser = (body: CreateUserPayload) =>
  post(userResponseSchema, getURL('/user'), {
    headers: getAuthorizationHeader(),
    body,
  });

export const confirmEmail = (token: string) =>
  patch(confirmEmailResponseSchema, getURL('/user/confirm-email'), {
    headers: getAuthorizationHeader(token),
  });

export const fetchUser = (userId: string) =>
  get(userResponseSchema, getURL(`/user/${userId}`), {
    headers: getAuthorizationHeader(),
  });

export const changePassword = (userId: string, body: ChangePasswordPayload) =>
  patch(userResponseSchema, getURL(`/user/${userId}/password`), {
    headers: getAuthorizationHeader(),
    body,
  });

export const resetPassword = (body: ResetPasswordPayload, redirectTo: string) =>
  patch(resetPasswordResponseSchema, getURL('/user/reset-password', { redirectTo }), {
    body,
  });
