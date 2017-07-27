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

  fetchMe: userId => {
    return apiClient.get(`/users/${userId}`);
  },
};
