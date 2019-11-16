import apiClient from 'common/services/apiClient';

import { LoginResponse } from 'common/services/user';

export const apiCallIds = {
  SIGN_UP: 'SIGN_UP',
  FORGOTTEN_PASSWORD: 'FORGOTTEN_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

export default {
  signUp: (email: string, password: string) =>
    apiClient.post<LoginResponse>(
      '/users',
      {
        email,
        password,
      },
      {
        apiCallId: apiCallIds.SIGN_UP,
      }
    ),

  forgottenPassword: (email: string) =>
    apiClient.post(
      '/auth/forgotten-password',
      {
        email,
      },
      {
        apiCallId: apiCallIds.FORGOTTEN_PASSWORD,
      }
    ),

  resetPassword: (email: string, password: string, passwordResetToken: string) =>
    apiClient.post<LoginResponse>(
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

  activateUser: (userId: string, activationToken: string) =>
    apiClient.get<LoginResponse>(`/users/${userId}/activate/${activationToken}`),
};
