import createApiClient from 'packages/api-client';
import { startSpinnerAction, finishSpinnerAction } from 'packages/spinner';

import { store } from 'app/store/configureStore';
import { message } from 'common/components';

import { selectToken, logoutAction } from './user';

export default createApiClient({
  axiosConfig: {
    baseURL: process.env.REACT_APP_API_URL,
  },
  selectToken: () => selectToken(store.getState()),
  onApiCallStart: apiCallId => store.dispatch(startSpinnerAction(apiCallId)),
  onApiCallFinish: apiCallId => store.dispatch(finishSpinnerAction(apiCallId)),
  onError: error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logoutAction());
    }

    showErrorMessage(error);
  },
});

function showErrorMessage(error) {
  const errorMsg = extractErrorMsg(error);

  if (Array.isArray(errorMsg)) {
    errorMsg.forEach(err => message.error(`${err}`, 5));
  } else {
    message.error(`${errorMsg}`);
  }
}

function extractErrorMsg(error) {
  return error.response && error.response.data
    ? error.response.data.message || error.response.data.error.inner
    : error;
}
