/**
 * Routes
 */
export const DASHBOARD_ROUTES = {
  index: {
    path: 'app/*',
    to: '/app',
  },
  home: {
    path: 'home',
    to: '/app/home',
  },
  profile: {
    path: 'profile/*',
    to: '/app/profile',
  },
  profileChangePassword: {
    path: 'change-password',
    to: '/app/profile/change-password',
  },
};
