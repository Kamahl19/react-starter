import axios, { AxiosError } from 'axios';

import { startSpinnerAction, finishSpinnerAction } from 'packages/spinner';

import { store } from 'app/store';
import { t } from 'common/services/i18next';
import { message } from 'common/components';

import { selectToken, logoutAction } from './user';

declare module 'axios' {
  interface AxiosRequestConfig {
    apiCallId?: string;
  }
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.interceptors.request.use(async config => {
  const token = selectToken(store.getState());

  if (token) {
    config.headers.common = config.headers.common ?? {};
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }

  store.dispatch(startSpinnerAction(config.apiCallId));

  return config;
});

apiClient.interceptors.response.use(
  response => {
    store.dispatch(finishSpinnerAction(response.config.apiCallId));

    return response;
  },
  (error: AxiosError) => {
    store.dispatch(finishSpinnerAction(error.config.apiCallId));

    if (!axios.isCancel(error)) {
      if (error.response?.status === 401) {
        store.dispatch(logoutAction());
      }

      showErrorMessage(error);

      throw error;
    }
  }
);

export default apiClient;

function showErrorMessage(error: AxiosError) {
  const errorMsg = extractErrorMsg(error);

  if (Array.isArray(errorMsg)) {
    errorMsg.forEach(err => message.error(`${err}`, 5));
  } else {
    message.error(`${errorMsg}`);
  }
}

function extractErrorMsg(error: AxiosError): string | string[] {
  const { response, message } = error;
  const request: XMLHttpRequest | undefined = error.request;

  // Server responded with a status code that falls out of the range of 2xx
  if (response) {
    if (response.data?.message) {
      return response.data.message;
    } else if (response.data?.error?.message) {
      return response.data.error.message;
    } else if (response.data?.error?.inner) {
      return response.data.error.inner;
    }

    return response.statusText;
  }
  // The request was made but no response was received
  else if (request) {
    return t('api.unexpectedError', { defaultValue: 'Unexpected error occured' });
  }

  // Something happened in setting up the request that triggered an Error
  return message;
}
