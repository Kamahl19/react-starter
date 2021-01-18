export const AUTH_ROUTE_PREFIX = '/auth';

export const AUTH_ROUTER_PATHS = {
  login: `${AUTH_ROUTE_PREFIX}/login`,
  logout: `${AUTH_ROUTE_PREFIX}/logout`,
  signUp: `${AUTH_ROUTE_PREFIX}/sign-up`,
  forgottenPassword: `${AUTH_ROUTE_PREFIX}/forgotten-password`,
  resetPassword: `${AUTH_ROUTE_PREFIX}/reset-password/:token`,
  activateAccount: `${AUTH_ROUTE_PREFIX}/activate/:userId/:token`,
};
