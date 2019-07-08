import apiClient from '../apiClient';

// TODO

export const apiCallIds = {
  LOGIN: 'LOGIN',
};

export default {
  login: (
    credentials: any // TODO
  ) =>
    apiClient.post('/auth/login', credentials, {
      apiCallId: apiCallIds.LOGIN,
    }),

  relogin: () => apiClient.get('/auth/relogin'),
};
