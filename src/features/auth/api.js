import apiClient from '../../common/services/apiClient';

export const apiCallIds = {
  SIGN_UP: 'SIGN_UP',
  FORGOTTEN_PASSWORD: 'FORGOTTEN_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

export default {
  signUp: userData =>
    apiClient.post('/users', userData, {
      apiCallId: apiCallIds.SIGN_UP,
    }),

  forgottenPassword: email =>
    apiClient.post(
      '/auth/forgotten-password',
      { email },
      { apiCallId: apiCallIds.FORGOTTEN_PASSWORD }
    ),

  resetPassword: (email, password, passwordResetToken) =>
    apiClient.post(
      '/auth/reset-password',
      { email, password, passwordResetToken },
      {
        apiCallId: apiCallIds.RESET_PASSWORD,
      }
    ),

  activateUser: (userId, activationToken) =>
    apiClient.get(`/users/${userId}/activate/${activationToken}`),
};
