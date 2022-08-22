import { rest, type PathParams } from 'msw';

import type {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  UserEmailAvailabilityResponse,
  CreateUserPayload,
  UserResponse,
  ChangePasswordPayload,
  ErrorResponse,
} from 'api';

import { db } from './db';

const parseToken = (authHeader: string | null) => (authHeader ?? '').split(' ')[1];

export const handlers = [
  rest.post<LoginPayload, PathParams, LoginResponse | ErrorResponse>(
    '/api/auth/login',
    async (req, res, ctx) => {
      const body = await req.json<LoginPayload>();

      if (!body.email || !body.password) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 400, message: 'Bad request' } })
        );
      }

      const user = db.user.findFirst({ where: { email: { equals: body.email } } });

      if (!user || user.password !== body.password) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 401, message: 'Unauthorized' } })
        );
      }

      return res(
        ctx.delay(100),
        ctx.json<LoginResponse>({
          token: user.id,
          userId: user.id,
        })
      );
    }
  ),

  rest.post('/api/auth/logout', async (_, res, ctx) => {
    return res(ctx.delay(100), ctx.json<LogoutResponse>(true));
  }),

  rest.get<never, PathParams<'email'>, UserEmailAvailabilityResponse>(
    '/api/auth/email-availability/:email',
    async (req, res, ctx) => {
      const isAvailable =
        db.user.findFirst({ where: { email: { equals: req.params.email as string } } }) === null;

      return res(ctx.delay(100), ctx.json<UserEmailAvailabilityResponse>(isAvailable));
    }
  ),

  rest.post<CreateUserPayload, PathParams, UserResponse | ErrorResponse>(
    '/api/user',
    async (req, res, ctx) => {
      const body = await req.json<CreateUserPayload>();

      if (!body.email || !body.password) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 400, message: 'Bad request' } })
        );
      }

      body.email = body.email.toLowerCase();

      if (db.user.findFirst({ where: { email: { equals: body.email } } }) !== null) {
        return res(
          ctx.status(409),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 409, message: 'User already exists' } })
        );
      }

      const user = db.user.create(body);

      return res(ctx.delay(100), ctx.json<UserResponse>({ user }));
    }
  ),

  rest.get<never, PathParams<'userId'>, UserResponse | ErrorResponse>(
    '/api/user/:userId',
    (req, res, ctx) => {
      const userId = req.params.userId as string;

      const token = parseToken(req.headers.get('authorization'));

      if (!token) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 401, message: 'Unauthorized' } })
        );
      }

      const user = db.user.findFirst({ where: { id: { equals: userId } } });

      if (!user) {
        return res(
          ctx.status(404),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 404, message: 'User not found' } })
        );
      }

      return res(ctx.delay(100), ctx.json<UserResponse>({ user }));
    }
  ),

  rest.patch<ChangePasswordPayload, PathParams<'userId'>, UserResponse | ErrorResponse>(
    '/api/user/:userId/password',
    async (req, res, ctx) => {
      const userId = req.params.userId as string;

      const token = parseToken(req.headers.get('authorization'));

      if (!token) {
        return res(
          ctx.status(401),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 401, message: 'Unauthorized' } })
        );
      }

      const body = await req.json<ChangePasswordPayload>();

      if (!body.password || !body.currentPassword) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 400, message: 'Bad request' } })
        );
      }

      const user = db.user.findFirst({ where: { id: { equals: userId } } });

      if (!user) {
        return res(
          ctx.status(404),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 404, message: 'User not found' } })
        );
      }

      if (user.password !== body.currentPassword) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ErrorResponse>({ error: { status: 400, message: 'Bad request' } })
        );
      }

      db.user.update({
        where: { id: { equals: userId } },
        data: { password: body.password },
      });

      return res(ctx.delay(100), ctx.json<UserResponse>({ user }));
    }
  ),
];
