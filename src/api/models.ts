import { z } from 'zod';

/**
 * Auth
 */
export { type Session } from '@supabase/supabase-js';

export const signUpPayloadSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const resendConfirmationPayloadSchema = z.object({
  email: z.string(),
});

export const signInPayloadSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const signInMagicLinkPayloadSchema = z.object({
  email: z.string(),
});

export const resetPasswordPayloadSchema = z.object({
  email: z.string(),
});

export const changePasswordPayloadSchema = z.object({
  password: z.string(),
});

export type SignUpPayload = z.infer<typeof signUpPayloadSchema>;
export type ResendConfirmationPayload = z.infer<typeof resendConfirmationPayloadSchema>;
export type SignInPayload = z.infer<typeof signInPayloadSchema>;
export type SignInMagicLinkPayload = z.infer<typeof signInMagicLinkPayloadSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordPayloadSchema>;
export type ChangePasswordPayload = z.infer<typeof changePasswordPayloadSchema>;

/**
 * User
 */

export { type User } from '@supabase/supabase-js';

/**
 * Bookshelf
 */

export const bookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string(),
  isInList: z.boolean(),
  finished: z.boolean(),
  rating: z.number(),
  note: z.string(),
  createdAt: z.string(),
});

export const bookResponseSchema = z.object({
  book: bookSchema,
});

export const booksResponseSchema = z.object({
  books: z.array(bookSchema),
});

export const addToReadingListPayloadSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
});

export const removeFromReadingListPayloadSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
});

export const markBookPayloadSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  finished: z.boolean(),
});

export const setRatingPayloadSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  rating: z.number(),
});

export const setNotePayloadSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  note: z.string(),
});

export type Book = z.infer<typeof bookSchema>;
export type BookResponse = z.infer<typeof bookResponseSchema>;
export type BooksResponse = z.infer<typeof booksResponseSchema>;
export type AddToReadingListPayload = z.infer<typeof addToReadingListPayloadSchema>;
export type RemoveFromReadingListPayload = z.infer<typeof removeFromReadingListPayloadSchema>;
export type MarkBookPayload = z.infer<typeof markBookPayloadSchema>;
export type SetRatingPayload = z.infer<typeof setRatingPayloadSchema>;
export type SetNotePayload = z.infer<typeof setNotePayloadSchema>;
