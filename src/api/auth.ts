import { z } from 'zod';

import { post, patch } from './client';
import { getURL, getAuthorizationHeader } from './common';

/**
 * Schemas
 */

export const loginPayloadSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  token: z.string(),
  userId: z.string(),
});

export const logoutResponseSchema = z.boolean();

/**
 *  Types
 */

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;

/**
 * Endpoints
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
