import { trackProgress } from 'common/services/trackProgress';
import apiClient from 'common/services/apiClient';
import {
  LoginPayload,
  AuthResponse,
  SignUpPayload,
  ForgottenPasswordPayload,
  ResetPasswordPayload,
  ActivateAccountPayload,
} from 'common/ApiTypes';

export const apiCallIds = {
  LOGIN: 'LOGIN',
  SIGN_UP: 'SIGN_UP',
  FORGOTTEN_PASSWORD: 'FORGOTTEN_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

const api = {
  login: (data: LoginPayload) =>
    trackProgress(apiClient.post<AuthResponse>('/auth/login', data), apiCallIds.LOGIN),

  relogin: () => trackProgress(apiClient.get<AuthResponse>('/auth/relogin')),

  signUp: (data: SignUpPayload) =>
    trackProgress(apiClient.post<AuthResponse>('/users', data), apiCallIds.SIGN_UP),

  forgottenPassword: (data: ForgottenPasswordPayload) =>
    trackProgress(apiClient.post('/auth/forgotten-password', data), apiCallIds.FORGOTTEN_PASSWORD),

  resetPassword: (data: ResetPasswordPayload) =>
    trackProgress(
      apiClient.post<AuthResponse>('/auth/reset-password', data),
      apiCallIds.RESET_PASSWORD
    ),

  activateAccount: ({ userId, token }: ActivateAccountPayload) =>
    trackProgress(apiClient.get<AuthResponse>(`/users/${userId}/activate/${token}`)),
};

export default api;
