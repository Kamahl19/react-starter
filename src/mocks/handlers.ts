import { rest } from 'msw';

import type {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  UserEmailAvailabilityResponse,
  CreateUserPayload,
  UserResponse,
  ChangePasswordPayload,
  ApiError,
} from 'api';
import { PASSWORD_MIN_LENGTH } from 'api';

import { db } from './db';

const getTokenFromHeader = (authHeader: string | null) => (authHeader ?? '').split(' ')[1];

export const handlers = [
  rest.post<LoginPayload, never, LoginResponse | ApiError>(
    '/api/auth/login',
    async (req, res, ctx) => {
      const body = await req.json<LoginPayload>();

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

      if (!body.password || !body.currentPassword) {
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

      if (user.password !== body.currentPassword) {
        return res(
          ctx.status(400),
          ctx.delay(100),
          ctx.json<ApiError>({ status: 400, message: 'Bad request' })
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
