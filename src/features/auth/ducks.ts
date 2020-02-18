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
  ActivateUserPayload,
  AuthResponse,
} from 'common/ApiTypes';
import { t } from 'common/services/i18next';
import { loginActions } from 'common/services/user';

import api from './api';

/**
 * ACTIONS
 */
export const signUpAction = createAction('auth/SIGN_UP')<SignUpPayload>();
export const forgottenPasswordAction = createAction('auth/FORGOTTEN_PASSWORD')<
  ForgottenPasswordPayload
>();
export const resetPasswordAction = createAction('auth/RESET_PASSWORD')<ResetPasswordPayload>();
export const activateUserAction = createAction('auth/ACTIVATE_USER')<ActivateUserPayload>();

const actions = { signUpAction, forgottenPasswordAction, resetPasswordAction, activateUserAction };
export type AuthAction = ActionType<typeof actions>;

/**
 * SAGAS
 */
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

function* activateUser({ payload }: ReturnType<typeof activateUserAction>) {
  try {
    const resp: AxiosResponse<AuthResponse> = yield call(api.activateUser, payload);

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
  yield takeLatest(signUpAction, signUp);
  yield takeLatest(forgottenPasswordAction, forgottenPassword);
  yield takeLatest(resetPasswordAction, resetPassword);
  yield takeLatest(activateUserAction, activateUser);
}
