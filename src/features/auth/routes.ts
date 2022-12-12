export const AUTH_ROUTES = {
  index: {
    path: 'auth/*',
    to: '/auth',
  },
  signUp: {
    path: 'sign-up',
    to: '/auth/sign-up',
  },
  forgottenPassword: {
    path: 'forgotten-password',
    to: '/auth/forgotten-password',
  },
  login: {
    path: 'login',
    to: '/auth/login',
  },
  confirmEmail: {
    path: 'confirm-email',
    to: '/auth/confirm-email',
  },
  resetPassword: {
    path: 'reset-password',
    to: '/auth/reset-password',
  },
} as const;
