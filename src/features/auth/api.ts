import apiClient from 'common/services/apiClient';
import {
  AuthResponse,
  SignUpPayload,
  ForgottenPasswordPayload,
  ResetPasswordPayload,
  ActivateUserPayload,
} from 'common/ApiTypes';

export const apiCallIds = {
  SIGN_UP: 'SIGN_UP',
  FORGOTTEN_PASSWORD: 'FORGOTTEN_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

export default {
  signUp: (data: SignUpPayload) =>
    apiClient.post<AuthResponse>('/users', data, {
      apiCallId: apiCallIds.SIGN_UP,
    }),

  forgottenPassword: (data: ForgottenPasswordPayload) =>
    apiClient.post('/auth/forgotten-password', data, {
      apiCallId: apiCallIds.FORGOTTEN_PASSWORD,
    }),

  resetPassword: (data: ResetPasswordPayload) =>
    apiClient.post<AuthResponse>('/auth/reset-password', data, {
      apiCallId: apiCallIds.RESET_PASSWORD,
    }),

  activateUser: ({ userId, activationToken }: ActivateUserPayload) =>
    apiClient.get<AuthResponse>(`/users/${userId}/activate/${activationToken}`),
};
