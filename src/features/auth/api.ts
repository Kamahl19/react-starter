import apiClient from 'common/services/apiClient';

// TODO

export const apiCallIds = {
  SIGN_UP: Symbol('SIGN_UP'),
  FORGOTTEN_PASSWORD: Symbol('FORGOTTEN_PASSWORD'),
  RESET_PASSWORD: Symbol('RESET_PASSWORD'),
};

export default {
  signUp: (email, password) =>
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

  forgottenPassword: email =>
    apiClient.post(
      '/auth/forgotten-password',
      {
        email,
      },
      {
        apiCallId: apiCallIds.FORGOTTEN_PASSWORD,
      }
    ),

  resetPassword: (email, password, passwordResetToken) =>
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

  activateUser: (userId, activationToken) =>
    apiClient.get(`/users/${userId}/activate/${activationToken}`),
};
