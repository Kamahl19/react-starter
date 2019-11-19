import { LoginPayload, AuthResponse } from 'common/ApiTypes';
import apiClient from 'common/services/apiClient';

export const apiCallIds = {
  LOGIN: 'LOGIN',
};

export default {
  login: (data: LoginPayload) =>
    apiClient.post<AuthResponse>('/auth/login', data, {
      apiCallId: apiCallIds.LOGIN,
    }),

  relogin: () => apiClient.get<AuthResponse>('/auth/relogin'),
};
