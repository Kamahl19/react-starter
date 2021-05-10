import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createAction, ActionType } from 'typesafe-actions';
import { message } from 'antd';

import { rootPath } from 'config';
import {
  SignUpPayload,
  ForgottenPasswordPayload,
  ResetPasswordPayload,
  ActivateAccountPayload,
  AuthResponse,
} from 'common/ApiTypes';
import { t } from 'common/services/i18next';
import { loginActions, reloginAction } from 'common/services/auth';

import api from './api';

/**
 * ACTIONS
 */
export const signUpAction = createAction('auth/SIGN_UP')<SignUpPayload>();
export const forgottenPasswordAction =
  createAction('auth/FORGOTTEN_PASSWORD')<ForgottenPasswordPayload>();
export const resetPasswordAction = createAction('auth/RESET_PASSWORD')<ResetPasswordPayload>();
export const activateAccountAction =
  createAction('auth/ACTIVATE_ACCOUNT')<ActivateAccountPayload>();

const actions = {
  signUpAction,
  forgottenPasswordAction,
  resetPasswordAction,
  activateAccountAction,
};
export type AuthAction = ActionType<typeof actions>;

/**
 * SAGAS
 */
function* login({ payload }: ReturnType<typeof loginActions.request>) {
  try {
    const resp: AxiosResponse<AuthResponse> = yield call(api.login, payload);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* relogin() {
  try {
    const resp: AxiosResponse<AuthResponse> = yield call(api.relogin);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* signUp({ payload }: ReturnType<typeof signUpAction>) {
  try {
    const resp: AxiosResponse<AuthResponse> = yield call(api.signUp, payload);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* forgottenPassword({ payload }: ReturnType<typeof forgottenPasswordAction>) {
  try {
    yield call(api.forgottenPassword, payload);

    message.success(
      t('auth.forgottenPasswordSent', {
        defaultValue: 'An e-mail with further instructions has been sent to your e-mail address.',
      })
    );

    yield put(push(rootPath));
  } catch {}
}

function* resetPassword({ payload }: ReturnType<typeof resetPasswordAction>) {
  try {
    const resp: AxiosResponse<AuthResponse> = yield call(api.resetPassword, payload);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* activateAccount({ payload }: ReturnType<typeof activateAccountAction>) {
  try {
    const resp: AxiosResponse<AuthResponse> = yield call(api.activateAccount, payload);

    message.success(
      t('auth.accountActivated', { defaultValue: 'Your account has been activated successfully.' })
    );

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }

  yield put(push(rootPath));
}

export function* authSaga() {
  yield takeLatest(loginActions.request, login);
  yield takeLatest(reloginAction, relogin);
  yield takeLatest(signUpAction, signUp);
  yield takeLatest(forgottenPasswordAction, forgottenPassword);
  yield takeLatest(resetPasswordAction, resetPassword);
  yield takeLatest(activateAccountAction, activateAccount);
}
