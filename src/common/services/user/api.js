import apiClient from '../apiClient';

export const apiCallIds = {
  LOGIN: 'LOGIN',
};

export default {
  login: credentials => apiClient.post('/auth/login', credentials, { apiCallId: apiCallIds.LOGIN }),

  relogin: () => apiClient.get('/auth/relogin'),
};
