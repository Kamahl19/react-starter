import { get, post, patch, del } from './client';
import { getURL, getAuthorizationHeader } from './utils';
import {
  signInResponseSchema,
  signOutResponseSchema,
  userResponseSchema,
  userEmailAvailabilityResponseSchema,
  confirmEmailResponseSchema,
  resetPasswordResponseSchema,
  booksResponseSchema,
  bookResponseSchema,
  readingListResponseSchema,
} from './models';
import type {
  SignInPayload,
  CreateUserPayload,
  ChangePasswordPayload,
  ResetPasswordPayload,
  AddToReadingListPayload,
  RemoveFromReadingListPayload,
  MarkBookPayload,
  SetNotePayload,
  SetRatingPayload,
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

/**
 * Bookshelf
 */

export const fetchBookshelfDiscover = () =>
  get(booksResponseSchema, getURL('/books/discover'), {
    headers: getAuthorizationHeader(),
  });

export const fetchBookshelfReadingList = () =>
  get(booksResponseSchema, getURL('/books/reading-list'), {
    headers: getAuthorizationHeader(),
  });

export const fetchBookshelfFinished = () =>
  get(booksResponseSchema, getURL('/books/finished'), {
    headers: getAuthorizationHeader(),
  });

export const fetchBook = (bookId: string) =>
  get(bookResponseSchema, getURL(`/books/${bookId}`), {
    headers: getAuthorizationHeader(),
  });

export const addToReadingList = (body: AddToReadingListPayload) =>
  post(readingListResponseSchema, getURL('/reading-list'), {
    headers: getAuthorizationHeader(),
    body,
  });

export const removeFromReadingList = (body: RemoveFromReadingListPayload) =>
  del(readingListResponseSchema, getURL('/reading-list'), {
    headers: getAuthorizationHeader(),
    body,
  });

export const markBook = (body: MarkBookPayload) =>
  patch(readingListResponseSchema, getURL('/reading-list/mark'), {
    headers: getAuthorizationHeader(),
    body,
  });

export const setRating = (body: SetRatingPayload) =>
  patch(readingListResponseSchema, getURL('/reading-list/rating'), {
    headers: getAuthorizationHeader(),
    body,
  });

export const setNote = (body: SetNotePayload) =>
  patch(readingListResponseSchema, getURL('/reading-list/note'), {
    headers: getAuthorizationHeader(),
    body,
  });
