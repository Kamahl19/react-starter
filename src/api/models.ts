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
});

export const bookResponseSchema = z.object({
  book: bookSchema,
});

export const booksResponseSchema = z.object({
  books: z.array(bookSchema),
});

export const readingListSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  finished: z.boolean(),
  rating: z.number(),
  note: z.string(),
});

export const readingListResponseSchema = readingListSchema;

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
export type ReadingListResponse = z.infer<typeof readingListResponseSchema>;
export type AddToReadingListPayload = z.infer<typeof addToReadingListPayloadSchema>;
export type RemoveFromReadingListPayload = z.infer<typeof removeFromReadingListPayloadSchema>;
export type MarkBookPayload = z.infer<typeof markBookPayloadSchema>;
export type SetRatingPayload = z.infer<typeof setRatingPayloadSchema>;
export type SetNotePayload = z.infer<typeof setNotePayloadSchema>;
