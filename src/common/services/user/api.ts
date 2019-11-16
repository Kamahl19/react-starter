import apiClient from '../apiClient';

import { LoginResponse } from './index';

export const apiCallIds = {
  LOGIN: 'LOGIN',
};

export default {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>(
      '/auth/login',
      { email, password },
      {
        apiCallId: apiCallIds.LOGIN,
      }
    ),

  relogin: () => apiClient.get<LoginResponse>('/auth/relogin'),
};
