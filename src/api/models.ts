import { z } from 'zod';

/**
 * Auth
 */

export const signInPayloadSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const signInResponseSchema = z.object({
  token: z.string(),
  userId: z.string(),
});

export const signOutResponseSchema = z.boolean();

export type SignInPayload = z.infer<typeof signInPayloadSchema>;
export type SignInResponse = z.infer<typeof signInResponseSchema>;
export type SignOutResponse = z.infer<typeof signOutResponseSchema>;

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
});

export const userResponseSchema = z.object({
  user: userSchema,
});

export const confirmEmailResponseSchema = z.boolean();

export const resetPasswordPayloadSchema = z.object({
  email: z.string(),
});

export const resetPasswordResponseSchema = z.boolean();

export const userEmailAvailabilityResponseSchema = z.boolean();

export type User = z.infer<typeof userSchema>;
export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;
export type ChangePasswordPayload = z.infer<typeof changePasswordPayloadSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordPayloadSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserEmailAvailabilityResponse = z.infer<typeof userEmailAvailabilityResponseSchema>;
