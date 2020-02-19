import { LoginPayload, AuthResponse } from 'common/ApiTypes';
import { trackProgress } from 'common/services/trackProgress';
import apiClient from 'common/services/apiClient';

export const apiCallIds = {
  LOGIN: 'LOGIN',
};

export default {
  login: (data: LoginPayload) =>
    trackProgress(apiClient.post<AuthResponse>('/auth/login', data), apiCallIds.LOGIN),

  relogin: () => trackProgress(apiClient.get<AuthResponse>('/auth/relogin')),
};
