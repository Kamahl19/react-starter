import { get, post, patch } from './client';
import { getURL, getAuthorizationHeader } from './utils';
import {
  loginResponseSchema,
  logoutResponseSchema,
  userResponseSchema,
  forgottenPasswordResponseSchema,
  userEmailAvailabilityResponseSchema,
  confirmEmailResponseSchema,
  resetPasswordResponseSchema,
} from './models';
import type {
  LoginPayload,
  CreateUserPayload,
  ChangePasswordPayload,
  ForgottenPasswordPayload,
  ResetPasswordPayload,
} from './models';

/**
 * Auth
 */

export const login = (body: LoginPayload) =>
  post(loginResponseSchema, getURL('/auth/login'), {
    body,
  });

export const relogin = () =>
  patch(loginResponseSchema, getURL('/auth/relogin'), {
    headers: getAuthorizationHeader(),
  });

export const logout = () =>
  post(logoutResponseSchema, getURL('/auth/logout'), {
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

export const forgottenPassword = (body: ForgottenPasswordPayload) =>
  post(forgottenPasswordResponseSchema, getURL('/user/forgot-password'), {
    headers: getAuthorizationHeader(),
    body,
  });

export const resetPassword = (token: string, body: ResetPasswordPayload) =>
  patch(resetPasswordResponseSchema, getURL('/user/reset-password'), {
    headers: getAuthorizationHeader(token),
    body,
  });
