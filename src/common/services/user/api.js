import apiClient from '../apiClient';

export const apiCallIds = {
  LOGIN: 'LOGIN',
};

export default {
  login: credentials => {
    return apiClient.post('/auth/login', credentials, { apiCallId: apiCallIds.LOGIN });
  },

  relogin: () => {
    return apiClient.get('/auth/relogin');
  },
};
