import { http, HttpResponse, delay } from 'msw';

import type {
  SignInPayload,
  SignInResponse,
  SignOutResponse,
  UserEmailAvailabilityResponse,
  CreateUserPayload,
  UserResponse,
  ChangePasswordPayload,
  BooksResponse,
  BookResponse,
  AddToReadingListPayload,
  ReadingListResponse,
  RemoveFromReadingListPayload,
  MarkBookPayload,
  SetRatingPayload,
  SetNotePayload,
} from 'api';
import { PASSWORD_MIN_LENGTH } from 'api';
import { type ApiError } from 'api/utils';

import { db } from './db';

const getTokenFromHeader = (authHeader: string | null) => (authHeader ?? '').split(' ')[1];

export const handlers = [
  /**
   * Auth
   */

  http.post<never, SignInPayload, SignInResponse | ApiError>(
    '/api/auth/sign-in',
    async ({ request }) => {
      const body = await request.json();

      if (!body.email || !body.password) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 400, message: 'Bad request' },
          { status: 400 },
        );
      }

      const user = db.user.findFirst({ where: { email: { equals: body.email } } });

      if (!user || user.password !== body.password) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 401, message: 'Unauthorized' },
          { status: 401 },
        );
      }

      await delay(100);
      return HttpResponse.json<SignInResponse>({
        token: user.id,
        userId: user.id,
      });
    },
  ),

  http.patch<never, never, SignInResponse | ApiError>('/api/auth/relogin', async ({ request }) => {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token) {
      await delay(100);
      return HttpResponse.json<ApiError>({ status: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const user = db.user.findFirst({ where: { id: { equals: token } } });

    if (!user) {
      await delay(100);
      return HttpResponse.json<ApiError>({ status: 401, message: 'Unauthorized' }, { status: 401 });
    }

    await delay(100);
    return HttpResponse.json<SignInResponse>({
      token: user.id,
      userId: user.id,
    });
  }),

  http.post('/api/auth/sign-out', async () => {
    await delay(100);
    return HttpResponse.json<SignOutResponse>(true);
  }),

  /**
   * User
   */

  http.get<{ email: string }, never, UserEmailAvailabilityResponse>(
    '/api/user/email-availability/:email',
    async ({ params: { email } }) => {
      const isAvailable = db.user.findFirst({ where: { email: { equals: email } } }) === null;

      await delay(100);
      return HttpResponse.json<UserEmailAvailabilityResponse>(isAvailable);
    },
  ),

  http.post<never, CreateUserPayload, UserResponse | ApiError>('/api/user', async ({ request }) => {
    const body = await request.json();

    if (!body.email || !body.password) {
      await delay(100);
      return HttpResponse.json<ApiError>({ status: 400, message: 'Bad request' }, { status: 400 });
    }

    if (body.password.length < PASSWORD_MIN_LENGTH) {
      await delay(100);
      return HttpResponse.json<ApiError>(
        {
          status: 422,
          message: 'Validation error',
          details: {
            password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
          },
        },
        { status: 422 },
      );
    }

    body.email = body.email.toLowerCase();

    if (db.user.findFirst({ where: { email: { equals: body.email } } }) !== null) {
      await delay(100);
      return HttpResponse.json<ApiError>(
        { status: 409, message: 'User already exists' },
        { status: 409 },
      );
    }

    const user = db.user.create(body);

    await delay(100);
    return HttpResponse.json<UserResponse>({ user });
  }),

  http.get<{ userId: string }, never, UserResponse | ApiError>(
    '/api/user/:userId',
    async ({ request, params: { userId } }) => {
      const token = getTokenFromHeader(request.headers.get('authorization'));

      if (!token) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 401, message: 'Unauthorized' },
          { status: 401 },
        );
      }

      const user = db.user.findFirst({ where: { id: { equals: userId } } });

      if (!user) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 404, message: 'User not found' },
          { status: 404 },
        );
      }

      await delay(100);
      return HttpResponse.json<UserResponse>({ user });
    },
  ),

  http.patch<{ userId: string }, ChangePasswordPayload, UserResponse | ApiError>(
    '/api/user/:userId/password',
    async ({ request, params: { userId } }) => {
      const token = getTokenFromHeader(request.headers.get('authorization'));

      if (!token) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 401, message: 'Unauthorized' },
          { status: 401 },
        );
      }

      const body = await request.json();

      if (!body.password) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 400, message: 'Bad request' },
          { status: 400 },
        );
      }

      const user = db.user.findFirst({ where: { id: { equals: userId } } });

      if (!user) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 404, message: 'User not found' },
          { status: 404 },
        );
      }

      db.user.update({
        where: { id: { equals: userId } },
        data: { password: body.password },
      });

      await delay(100);
      return HttpResponse.json<UserResponse>({ user });
    },
  ),

  /**
   * Bookshelf
   */

  http.get<never, never, BooksResponse | ApiError>('/api/books/discover', async ({ request }) => {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token) {
      await delay(100);
      return HttpResponse.json<ApiError>({ status: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const books = db.book
      .findMany({
        where: {
          id: {
            notIn: db.readingList
              .findMany({ where: { userId: { equals: token } } })
              .map(({ bookId }) => bookId),
          },
        },
        orderBy: { title: 'asc' },
      })
      .map((book) => ({
        ...book,
        isInList: false,
        finished: false,
        rating: 0,
        note: '',
      }));

    await delay(100);
    return HttpResponse.json<BooksResponse>({ books });
  }),

  http.get<never, never, BooksResponse | ApiError>(
    '/api/books/reading-list',
    async ({ request }) => {
      const token = getTokenFromHeader(request.headers.get('authorization'));

      if (!token) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 401, message: 'Unauthorized' },
          { status: 401 },
        );
      }

      const readingList = db.readingList.findMany({
        where: {
          userId: { equals: token },
          finished: { equals: false },
        },
      });

      const books = db.book
        .findMany({
          where: {
            id: {
              in: readingList.map(({ bookId }) => bookId),
            },
          },
          orderBy: { title: 'asc' },
        })
        .map((book) => ({
          ...book,
          isInList: true,
          finished: readingList.find(({ bookId }) => bookId === book.id)?.finished ?? false,
          rating: readingList.find(({ bookId }) => bookId === book.id)?.rating ?? 0,
          note: readingList.find(({ bookId }) => bookId === book.id)?.note ?? '',
        }));

      await delay(100);
      return HttpResponse.json<BooksResponse>({ books });
    },
  ),

  http.get<never, never, BooksResponse | ApiError>('/api/books/finished', async ({ request }) => {
    const token = getTokenFromHeader(request.headers.get('authorization'));

    if (!token) {
      await delay(100);
      return HttpResponse.json<ApiError>({ status: 401, message: 'Unauthorized' }, { status: 401 });
    }

    const readingList = db.readingList.findMany({
      where: {
        userId: { equals: token },
        finished: { equals: true },
      },
    });

    const books = db.book
      .findMany({
        where: {
          id: {
            in: readingList.map(({ bookId }) => bookId),
          },
        },
        orderBy: { title: 'asc' },
      })
      .map((book) => ({
        ...book,
        isInList: true,
        finished: readingList.find(({ bookId }) => bookId === book.id)?.finished ?? false,
        rating: readingList.find(({ bookId }) => bookId === book.id)?.rating ?? 0,
        note: readingList.find(({ bookId }) => bookId === book.id)?.note ?? '',
      }));

    await delay(100);
    return HttpResponse.json<BooksResponse>({ books });
  }),

  http.get<{ bookId: string }, never, BookResponse | ApiError>(
    '/api/books/:bookId',
    async ({ request, params: { bookId } }) => {
      const token = getTokenFromHeader(request.headers.get('authorization'));

      if (!token) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 401, message: 'Unauthorized' },
          { status: 401 },
        );
      }

      const book = db.book.findFirst({ where: { id: { equals: bookId } } });

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: token },
          bookId: { equals: bookId },
        },
      });

      if (!book) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 404, message: 'User not found' },
          { status: 404 },
        );
      }

      await delay(100);
      return HttpResponse.json<BookResponse>({
        book: {
          ...book,
          isInList: readingList !== null,
          finished: readingList?.finished ?? false,
          rating: readingList?.rating ?? 0,
          note: readingList?.note ?? '',
        },
      });
    },
  ),

  http.post<never, AddToReadingListPayload, ReadingListResponse | ApiError>(
    '/api/reading-list',
    async ({ request }) => {
      const body = await request.json();

      if (!body.userId || !body.bookId) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 400, message: 'Bad request' },
          { status: 400 },
        );
      }

      if (
        db.readingList.findFirst({
          where: {
            userId: { equals: body.userId },
            bookId: { equals: body.bookId },
          },
        }) !== null
      ) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 409, message: 'Already in reading list' },
          { status: 409 },
        );
      }

      const readingList = db.readingList.create({
        ...body,
        finished: false,
        rating: 0,
        note: '',
      });

      await delay(100);
      return HttpResponse.json<ReadingListResponse>(readingList);
    },
  ),

  http.delete<never, RemoveFromReadingListPayload, ReadingListResponse | ApiError>(
    '/api/reading-list',
    async ({ request }) => {
      const body = await request.json();

      if (!body.userId || !body.bookId) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 400, message: 'Bad request' },
          { status: 400 },
        );
      }

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      if (readingList === null) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 409, message: 'Not in reading list' },
          { status: 409 },
        );
      }

      db.readingList.delete({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      await delay(100);
      return HttpResponse.json<ReadingListResponse>(readingList);
    },
  ),

  http.patch<never, MarkBookPayload, ReadingListResponse | ApiError>(
    '/api/reading-list/mark',
    async ({ request }) => {
      const body = await request.json();

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      if (readingList === null) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 409, message: 'Not in reading list' },
          { status: 409 },
        );
      }

      db.readingList.update({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
        data: body.finished ? { finished: true } : { finished: false, rating: 0 },
      });

      await delay(100);
      return HttpResponse.json<ReadingListResponse>(readingList);
    },
  ),

  http.patch<never, SetRatingPayload, ReadingListResponse | ApiError>(
    '/api/reading-list/rating',
    async ({ request }) => {
      const body = await request.json();

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      if (readingList === null) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 409, message: 'Not in reading list' },
          { status: 409 },
        );
      }

      db.readingList.update({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
        data: {
          rating: body.rating,
        },
      });

      await delay(100);
      return HttpResponse.json<ReadingListResponse>(readingList);
    },
  ),

  http.patch<never, SetNotePayload, ReadingListResponse | ApiError>(
    '/api/reading-list/note',
    async ({ request }) => {
      const body = await request.json();

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      if (readingList === null) {
        await delay(100);
        return HttpResponse.json<ApiError>(
          { status: 409, message: 'Not in reading list' },
          { status: 409 },
        );
      }

      db.readingList.update({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
        data: {
          note: body.note,
        },
      });

      await delay(100);
      return HttpResponse.json<ReadingListResponse>(readingList);
    },
  ),
];
