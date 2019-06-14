import apiClient from 'common/services/apiClient';

// TODO

type TODO = any;

export const apiCallIds = {
  SIGN_UP: Symbol('SIGN_UP'),
  FORGOTTEN_PASSWORD: Symbol('FORGOTTEN_PASSWORD'),
  RESET_PASSWORD: Symbol('RESET_PASSWORD'),
};

export default {
  signUp: (email: TODO, password: TODO) =>
    apiClient.post(
      '/users',
      {
        email,
        password,
      },
      {
        apiCallId: apiCallIds.SIGN_UP,
      }
    ),

  forgottenPassword: (email: TODO) =>
    apiClient.post(
      '/auth/forgotten-password',
      {
        email,
      },
      {
        apiCallId: apiCallIds.FORGOTTEN_PASSWORD,
      }
    ),

  resetPassword: (email: TODO, password: TODO, passwordResetToken: TODO) =>
    apiClient.post(
      '/auth/reset-password',
      {
        email,
        password,
        passwordResetToken,
      },
      {
        apiCallId: apiCallIds.RESET_PASSWORD,
      }
    ),

  activateUser: (userId: TODO, activationToken: TODO) =>
    apiClient.get(`/users/${userId}/activate/${activationToken}`),
};
