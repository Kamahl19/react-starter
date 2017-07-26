import apiClient from '../../../common/services/apiClient';

export default {
  signUp: userData => {
    delete userData.repeatPassword;

    return apiClient.post('/users', userData);
  },

  login: credentials => {
    return apiClient.post('/auth/login', credentials);
  },

  forgottenPassword: email => {
    return apiClient.post('/auth/forgotten-password', { email });
  },

  resetPassword: resetData => {
    delete resetData.repeatPassword;

    return apiClient.post('/auth/reset-password', resetData);
  },

  activateUser: ({ userId, activationToken }) => {
    return apiClient.get(`/users/${userId}/activate/${activationToken}`);
  },

  fetchMe: userId => {
    return apiClient.get(`/users/${userId}`);
  },
};
