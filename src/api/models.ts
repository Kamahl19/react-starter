import { z } from 'zod';

/**
 * Auth
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

export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;

/**
 * User
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

export type User = z.infer<typeof userSchema>;
export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;
export type ChangePasswordPayload = z.infer<typeof changePasswordPayloadSchema>;
export type ForgottenPasswordPayload = z.infer<typeof forgottenPasswordPayloadSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordPayloadSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserEmailAvailabilityResponse = z.infer<typeof userEmailAvailabilityResponseSchema>;
