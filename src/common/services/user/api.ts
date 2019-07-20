import apiClient from '../apiClient';

export const apiCallIds = {
  LOGIN: 'LOGIN',
};

export default {
  login: (email: string, password: string) =>
    apiClient.post(
      '/auth/login',
      { email, password },
      {
        apiCallId: apiCallIds.LOGIN,
      }
    ),

  relogin: () => apiClient.get('/auth/relogin'),
};
