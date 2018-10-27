import axios from 'axios';

import { store } from '../../app/store/configureStore';

import { startApiCallAction, finishApiCallAction } from './spinner';
import { selectToken, logoutAction } from './user';
import AlertService from './alert';

const apiClient = axios.create({
  responseType: 'json',
  baseURL: process.env.REACT_APP_API_URL,
});

export default apiClient;

apiClient.interceptors.request.use(async config => {
  const token = selectToken(store.getState());

  if (token) {
    config.headers.common = config.headers.common || {};
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }

  store.dispatch(
    startApiCallAction({
      apiCallId: config.apiCallId,
    })
  );

  return config;
});

export function handleResponsesInterceptor(store) {
  apiClient.interceptors.response.use(
    response => {
      store.dispatch(
        finishApiCallAction({
          apiCallId: response.config.apiCallId,
        })
      );

      return normalizeSuccessResponse(response);
    },
    error => {
      if (!axios.isCancel(error)) {
        store.dispatch(
          finishApiCallAction({
            apiCallId: error.config.apiCallId,
            error,
          })
        );

        if (error.response && error.response.status === 401) {
          store.dispatch(logoutAction());
        }

        showErrorMessage(error);
      }

      return normalizeErrorResponse(error);
    }
  );
}

function normalizeSuccessResponse(response) {
  return {
    ...response,
    ok: true,
  };
}

function normalizeErrorResponse(error) {
  return {
    ...error,
    ok: false,
  };
}

function showErrorMessage(error) {
  const errorMsg = extractErrorMsg(error);

  if (Array.isArray(errorMsg)) {
    errorMsg.forEach(err => AlertService.error(`${err}`, 5));
  } else {
    AlertService.error(`${errorMsg}`);
  }
}

function extractErrorMsg(error) {
  return error.response && error.response.data
    ? error.response.data.message || error.response.data.error.inner
    : error;
}
