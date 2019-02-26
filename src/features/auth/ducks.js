import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { createActionCreator } from '../../packages/redux-helpers';

import { rootPath } from '../../config';
import { t } from '../../common/services/i18next';
import { loginActions } from '../../common/services/user';
import { message } from '../../common/components';

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
  try {
    const resp = yield call(api.signUp, email, password);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* forgottenPassword({ payload }) {
  try {
    yield call(api.forgottenPassword, payload.email);

    message.success(t('An e-mail with further instructions has been sent to your e-mail address.'));
    yield put(push(rootPath));
  } catch {}
}

function* resetPassword({ payload: { email, password, passwordResetToken } }) {
  try {
    const resp = yield call(api.resetPassword, email, password, passwordResetToken);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* locationChanged({ payload }) {
  const activatePath = '/activate/';

  if (payload.location.pathname.includes(activatePath)) {
    const exclude = activatePath.split('/');
    const [userId, activationToken] = payload.location.pathname
      .split('/')
      .filter(part => !exclude.includes(part));

    yield call(activateUser, userId, activationToken);
  }
}

function* activateUser(userId, activationToken) {
  try {
    const resp = yield call(api.activateUser, userId, activationToken);

    message.success(t('Your account has been activated successfully'));

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }

  yield put(push(rootPath));
}

export function* authSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
  yield takeLatest(FORGOTTEN_PASSWORD, forgottenPassword);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeEvery('@@router/LOCATION_CHANGE', locationChanged);
}
