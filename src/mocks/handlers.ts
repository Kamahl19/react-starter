import { rest } from 'msw';

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

  rest.post<SignInPayload, never, SignInResponse | ApiError>(
    '/api/auth/sign-in',
    async (req, res, ctx) => {
      const body = await req.json<SignInPayload>();

      if (!body.email || !body.password) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 400, message: 'Bad request' })
        );
      }

      const user = db.user.findFirst({ where: { email: { equals: body.email } } });

      if (!user || user.password !== body.password) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
        );
      }

      return res(
        ctx.delay(100),
        ctx.json<SignInResponse>({
          token: user.id,
          userId: user.id,
        })
      );
    }
  ),

  rest.patch<never, never, SignInResponse | ApiError>(
    '/api/auth/relogin',
    async (req, res, ctx) => {
      const token = getTokenFromHeader(req.headers.get('authorization'));

      if (!token) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
        );
      }

      const user = db.user.findFirst({ where: { id: { equals: token } } });

      if (!user) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
        );
      }

      return res(
        ctx.delay(100),
        ctx.json<SignInResponse>({
          token: user.id,
          userId: user.id,
        })
      );
    }
  ),

  rest.post('/api/auth/sign-out', async (_, res, ctx) => {
    return res(ctx.delay(100), ctx.json<SignOutResponse>(true));
  }),

  /**
   * User
   */

  rest.get<never, { email: string }, UserEmailAvailabilityResponse>(
    '/api/user/email-availability/:email',
    async (req, res, ctx) => {
      const isAvailable =
        db.user.findFirst({ where: { email: { equals: req.params.email } } }) === null;

      return res(ctx.delay(100), ctx.json<UserEmailAvailabilityResponse>(isAvailable));
    }
  ),

  rest.post<CreateUserPayload, never, UserResponse | ApiError>(
    '/api/user',
    async (req, res, ctx) => {
      const body = await req.json<CreateUserPayload>();

      if (!body.email || !body.password) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 400, message: 'Bad request' })
        );
      }

      if (body.password.length < PASSWORD_MIN_LENGTH) {
        return res(
          ctx.status(422),
          ctx.delay(100),
          ctx.json<ApiError>({
            status: 422,
            message: 'Validation error',
            details: {
              password: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
            },
          })
        );
      }

      body.email = body.email.toLowerCase();

      if (db.user.findFirst({ where: { email: { equals: body.email } } }) !== null) {
        return res(
          ctx.status(409),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 409, message: 'User already exists' })
        );
      }

      const user = db.user.create(body);

      return res(ctx.delay(100), ctx.json<UserResponse>({ user }));
    }
  ),

  rest.get<never, { userId: string }, UserResponse | ApiError>(
    '/api/user/:userId',
    (req, res, ctx) => {
      const userId = req.params.userId;

      const token = getTokenFromHeader(req.headers.get('authorization'));

      if (!token) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
        );
      }

      const user = db.user.findFirst({ where: { id: { equals: userId } } });

      if (!user) {
        return res(
          ctx.status(404),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 404, message: 'User not found' })
        );
      }

      return res(ctx.delay(100), ctx.json<UserResponse>({ user }));
    }
  ),

  rest.patch<ChangePasswordPayload, { userId: string }, UserResponse | ApiError>(
    '/api/user/:userId/password',
    async (req, res, ctx) => {
      const userId = req.params.userId;

      const token = getTokenFromHeader(req.headers.get('authorization'));

      if (!token) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
        );
      }

      const body = await req.json<ChangePasswordPayload>();

      if (!body.password) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 400, message: 'Bad request' })
        );
      }

      const user = db.user.findFirst({ where: { id: { equals: userId } } });

      if (!user) {
        return res(
          ctx.status(404),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 404, message: 'User not found' })
        );
      }

      db.user.update({
        where: { id: { equals: userId } },
        data: { password: body.password },
      });

      return res(ctx.delay(100), ctx.json<UserResponse>({ user }));
    }
  ),

  /**
   * Bookshelf
   */

  rest.get<never, never, BooksResponse | ApiError>('/api/books/discover', (req, res, ctx) => {
    const token = getTokenFromHeader(req.headers.get('authorization'));

    if (!token) {
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
      );
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

    return res(ctx.delay(100), ctx.json<BooksResponse>({ books }));
  }),

  rest.get<never, never, BooksResponse | ApiError>('/api/books/reading-list', (req, res, ctx) => {
    const token = getTokenFromHeader(req.headers.get('authorization'));

    if (!token) {
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
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

    return res(ctx.delay(100), ctx.json<BooksResponse>({ books }));
  }),

  rest.get<never, never, BooksResponse | ApiError>('/api/books/finished', (req, res, ctx) => {
    const token = getTokenFromHeader(req.headers.get('authorization'));

    if (!token) {
      return res(
        ctx.status(401),
        ctx.delay(100),
        ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
      );
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

    return res(ctx.delay(100), ctx.json<BooksResponse>({ books }));
  }),

  rest.get<never, { bookId: string }, BookResponse | ApiError>(
    '/api/books/:bookId',
    (req, res, ctx) => {
      const bookId = req.params.bookId;

      const token = getTokenFromHeader(req.headers.get('authorization'));

      if (!token) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 401, message: 'Unauthorized' })
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
        return res(
          ctx.status(404),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 404, message: 'User not found' })
        );
      }

      return res(
        ctx.delay(100),
        ctx.json<BookResponse>({
          book: {
            ...book,
            isInList: readingList !== null,
            finished: readingList?.finished ?? false,
            rating: readingList?.rating ?? 0,
            note: readingList?.note ?? '',
          },
        })
      );
    }
  ),

  rest.post<AddToReadingListPayload, never, ReadingListResponse | ApiError>(
    '/api/reading-list',
    async (req, res, ctx) => {
      const body = await req.json<AddToReadingListPayload>();

      if (!body.userId || !body.bookId) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 400, message: 'Bad request' })
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
        return res(
          ctx.status(409),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 409, message: 'Already in reading list' })
        );
      }

      const readingList = db.readingList.create({
        ...body,
        finished: false,
        rating: 0,
        note: '',
      });

      return res(ctx.delay(100), ctx.json<ReadingListResponse>(readingList));
    }
  ),

  rest.delete<RemoveFromReadingListPayload, never, ReadingListResponse | ApiError>(
    '/api/reading-list',
    async (req, res, ctx) => {
      const body = await req.json<RemoveFromReadingListPayload>();

      if (!body.userId || !body.bookId) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 400, message: 'Bad request' })
        );
      }

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      if (readingList === null) {
        return res(
          ctx.status(409),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 409, message: 'Not in reading list' })
        );
      }

      db.readingList.delete({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      return res(ctx.delay(100), ctx.json<ReadingListResponse>(readingList));
    }
  ),

  rest.patch<MarkBookPayload, never, ReadingListResponse | ApiError>(
    '/api/reading-list/mark',
    async (req, res, ctx) => {
      const body = await req.json<MarkBookPayload>();

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      if (readingList === null) {
        return res(
          ctx.status(409),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 409, message: 'Not in reading list' })
        );
      }

      db.readingList.update({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
        data: body.finished ? { finished: true } : { finished: false, rating: 0 },
      });

      return res(ctx.delay(100), ctx.json<ReadingListResponse>(readingList));
    }
  ),

  rest.patch<SetRatingPayload, never, ReadingListResponse | ApiError>(
    '/api/reading-list/rating',
    async (req, res, ctx) => {
      const body = await req.json<SetRatingPayload>();

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      if (readingList === null) {
        return res(
          ctx.status(409),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 409, message: 'Not in reading list' })
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

      return res(ctx.delay(100), ctx.json<ReadingListResponse>(readingList));
    }
  ),

  rest.patch<SetNotePayload, never, ReadingListResponse | ApiError>(
    '/api/reading-list/note',
    async (req, res, ctx) => {
      const body = await req.json<SetNotePayload>();

      const readingList = db.readingList.findFirst({
        where: {
          userId: { equals: body.userId },
          bookId: { equals: body.bookId },
        },
      });

      if (readingList === null) {
        return res(
          ctx.status(409),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 409, message: 'Not in reading list' })
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

      return res(ctx.delay(100), ctx.json<ReadingListResponse>(readingList));
    }
  ),
];
