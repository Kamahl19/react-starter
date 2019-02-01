import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { t } from '../../common/services/i18n';
import AlertService from '../../common/services/alert';
import { loginActions } from '../../common/services/user';
import { createActionCreator } from '../../packages/redux-helpers';

import api from './api';

/**
 * ACTION TYPES
 */
export const SIGN_UP_REQUEST = 'auth/SIGN_UP_REQUEST';
export const FORGOTTEN_PASSWORD = 'auth/FORGOTTEN_PASSWORD';
export const RESET_PASSWORD = 'auth/RESET_PASSWORD';

/**
 * ACTIONS
 */
export const signUpRequest = createActionCreator(SIGN_UP_REQUEST);
export const forgottenPasswordRequest = createActionCreator(FORGOTTEN_PASSWORD);
export const resetPasswordRequest = createActionCreator(RESET_PASSWORD);

/**
 * SAGAS
 */
function* signUp({ payload: { email, password } }) {
  const resp = yield call(api.signUp, email, password);

  yield call(receiveLogin, resp);
}

function* receiveLogin(resp) {
  if (resp.ok) {
    yield put(loginActions.success(resp.data));
  } else {
    yield put(loginActions.failure(resp.error));
  }
}

function* forgottenPassword({ payload }) {
  const resp = yield call(api.forgottenPassword, payload.email);

  if (resp.ok) {
    AlertService.success(
      t('An e-mail with further instructions has been sent to your e-mail address.')
    );

    yield put(push('/'));
  }
}

function* resetPassword({ payload: { email, password, passwordResetToken } }) {
  const resp = yield call(api.resetPassword, email, password, passwordResetToken);

  yield call(receiveLogin, resp);
}

function* locationChanged({ payload }) {
  const activatePath = '/auth/activate/';

  if (payload.location.pathname.includes(activatePath)) {
    const exclude = activatePath.split('/');
    const [userId, activationToken] = payload.location.pathname
      .split('/')
      .filter(part => !exclude.includes(part));

    yield call(activateUser, userId, activationToken);
  }
}

function* activateUser(userId, activationToken) {
  const resp = yield call(api.activateUser, userId, activationToken);

  if (resp.ok) {
    AlertService.success(t('Your account has been activated successfully'));

    yield call(receiveLogin, resp);
  }

  yield put(push('/'));
}

export function* authSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
  yield takeLatest(FORGOTTEN_PASSWORD, forgottenPassword);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeEvery('@@router/LOCATION_CHANGE', locationChanged);
}
