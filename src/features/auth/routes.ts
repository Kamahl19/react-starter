export const AUTH_ROUTES = {
  index: {
    path: 'auth/*',
    to: '/auth',
  },
  signUp: {
    path: 'sign-up',
    to: '/auth/sign-up',
  },
  signIn: {
    path: 'sign-in',
    to: '/auth/sign-in',
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
