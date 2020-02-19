import { trackProgress } from 'common/services/trackProgress';
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
    trackProgress(apiClient.post<AuthResponse>('/users', data), apiCallIds.SIGN_UP),

  forgottenPassword: (data: ForgottenPasswordPayload) =>
    trackProgress(apiClient.post('/auth/forgotten-password', data), apiCallIds.FORGOTTEN_PASSWORD),

  resetPassword: (data: ResetPasswordPayload) =>
    trackProgress(
      apiClient.post<AuthResponse>('/auth/reset-password', data),
      apiCallIds.RESET_PASSWORD
    ),

  activateUser: ({ userId, activationToken }: ActivateUserPayload) =>
    trackProgress(apiClient.get<AuthResponse>(`/users/${userId}/activate/${activationToken}`)),
};
