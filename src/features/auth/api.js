import apiClient from '../../common/services/apiClient';

export const apiCallIds = {
  SIGN_UP: 'SIGN_UP',
  FORGOTTEN_PASSWORD: 'FORGOTTEN_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
  // VERIFY_EMAIL: 'VERIFY_EMAIL', // TODO
  // RESEND_EMAIL_VERIFICATION: 'RESEND_EMAIL_VERIFICATION', // TODO
};

export default {
  signUp: userData => {
    delete userData.repeatPassword;

    return apiClient.post('/users', userData, {
      apiCallId: apiCallIds.SIGN_UP,
    });
  },

  forgottenPassword: email => {
    return apiClient.post(
      '/auth/forgotten-password',
      { email },
      { apiCallId: apiCallIds.FORGOTTEN_PASSWORD }
    );
  },

  resetPassword: resetData => {
    delete resetData.repeatPassword;

    return apiClient.post('/auth/reset-password', resetData, {
      apiCallId: apiCallIds.RESET_PASSWORD,
    });
  },

  activateUser: (userId, activationToken) => {
    return apiClient.get(`/users/${userId}/activate/${activationToken}`);
  },

  // verifyEmail: data => {
  //   return apiClient.post(`/auth/verify-email/`, data, {
  //     apiCallId: apiCallIds.VERIFY_EMAIL,
  //   });
  // },

  // resendEmailVerification: data => {
  //   return apiClient.post(`/auth/resend-verify-email/`, data, {
  //     apiCallId: apiCallIds.RESEND_EMAIL_VERIFICATION,
  //   });
  // },
};
