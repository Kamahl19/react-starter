import axios from 'axios';
import AlertService from '../../common/services/alert';
import { selectToken, logout } from '../../features/auth/ducks';
import { startApiCall, finishApiCall } from '../../features/spinner/ducks';

const apiClient = axios.create({
  responseType: 'json',
  baseURL: process.env.REACT_APP_API_URL,
});

export default apiClient;

export function prepareRequestInterceptor(store) {
  apiClient.interceptors.request.use(config => {
    const token = selectToken(store.getState());

    if (token) {
      config.headers.common = config.headers.common || {};
      config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    store.dispatch(
      startApiCall({
        apiCallId: config.apiCallId,
      })
    );

    return config;
  });
}

export function handleResponsesInterceptor(store) {
  apiClient.interceptors.response.use(
    response => {
      store.dispatch(
        finishApiCall({
          apiCallId: response.config.apiCallId,
        })
      );

      return normalizeSuccessResponse(response);
    },
    error => {
      store.dispatch(
        finishApiCall({
          apiCallId: error.config.apiCallId,
          error,
        })
      );

      if (error.response && error.response.status === 401) {
        store.dispatch(logout());
      }

      showErrorMessage(error);

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
  const errorMsg =
    error.response && error.response.data
      ? error.response.data.message || error.response.data.error.inner
      : error;

  if (Array.isArray(errorMsg)) {
    errorMsg.forEach(err => AlertService.error(`${err}`, 5));
  } else {
    AlertService.error(`${errorMsg}`);
  }
}
