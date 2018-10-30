import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { t } from '../../common/services/i18n';
import AlertService from '../../common/services/alert';
import { loginActions } from '../../common/services/user';
import { createActionCreator } from '../../common/utils/reduxHelpers';

import api from './api';

/**
 * ACTION TYPES
 */
export const SIGN_UP_REQUEST = 'auth/SIGN_UP_REQUEST';
export const RELOGIN_REQUEST = 'auth/RELOGIN_REQUEST';
export const LOGOUT = 'auth/LOGOUT';
export const FORGOTTEN_PASSWORD = 'auth/FORGOTTEN_PASSWORD';
export const RESET_PASSWORD = 'auth/RESET_PASSWORD';

/**
 * ACTIONS
 */
export const reloginRequest = createActionCreator(RELOGIN_REQUEST);
export const logout = createActionCreator(LOGOUT);
export const forgottenPasswordRequest = createActionCreator(FORGOTTEN_PASSWORD);
export const resetPasswordRequest = createActionCreator(RESET_PASSWORD);

/**
 * SAGAS
 */

function* relogin() {
  const resp = yield call(api.relogin);

  yield call(receiveLogin, resp);
}

function* receiveLogin(resp) {
  if (resp.ok) {
    yield put(loginActions.success(resp.data));
  } else {
    yield put(loginActions.failure(resp.error));
  }
}

function* logoutRedirect() {
  yield put(push('/auth/login'));
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

function* resetPassword({ payload }) {
  const resp = yield call(api.resetPassword, payload);

  yield call(receiveLogin, resp);
}

function* locationChanged({ payload }) {
  const activatePath = '/auth/activate/';

  if (payload.pathname.includes(activatePath)) {
    const exclude = activatePath.split('/');
    const [userId, activationToken] = payload.pathname
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
  yield takeLatest(RELOGIN_REQUEST, relogin);
  yield takeLatest(LOGOUT, logoutRedirect);
  yield takeLatest(FORGOTTEN_PASSWORD, forgottenPassword);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeEvery('@@router/LOCATION_CHANGE', locationChanged);
}
