import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createAction, ActionType } from 'typesafe-actions';

import { rootPath } from 'config';
import { t } from 'common/services/i18next';
import { loginActions, LoginResponse } from 'common/services/user';
import { message } from 'common/components';

import api from './api';

/**
 * MODEL
 */
type SignupPayload = {
  email: string;
  password: string;
};

type ForgottenPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  password: string;
  passwordResetToken: string;
};

export type ActivateUserPayload = {
  userId: string;
  activationToken: string;
};

/**
 * ACTIONS
 */
export const signUpAction = createAction('auth/SIGN_UP')<SignupPayload>();
export const forgottenPasswordAction = createAction('auth/FORGOTTEN_PASSWORD')<
  ForgottenPasswordPayload
>();
export const resetPasswordAction = createAction('auth/RESET_PASSWORD')<ResetPasswordPayload>();
export const activateUserAction = createAction('auth/ACTIVATE_USER')<ActivateUserPayload>();

const actions = { signUpAction, forgottenPasswordAction, resetPasswordAction };
export type AuthAction = ActionType<typeof actions>;

/**
 * SAGAS
 */
function* signUp({ payload: { email, password } }: ReturnType<typeof signUpAction>) {
  try {
    const resp: AxiosResponse<LoginResponse> = yield call(api.signUp, email, password);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* forgottenPassword({ payload }: ReturnType<typeof forgottenPasswordAction>) {
  try {
    yield call(api.forgottenPassword, payload.email);

    message.success(
      t('auth.forgottenPasswordSent', {
        defaultValue: 'An e-mail with further instructions has been sent to your e-mail address.',
      })
    );

    yield put(push(rootPath));
  } catch {}
}

function* resetPassword({
  payload: { email, password, passwordResetToken },
}: ReturnType<typeof resetPasswordAction>) {
  try {
    const resp: AxiosResponse<LoginResponse> = yield call(
      api.resetPassword,
      email,
      password,
      passwordResetToken
    );

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* activateUser({
  payload: { userId, activationToken },
}: ReturnType<typeof activateUserAction>) {
  try {
    const resp: AxiosResponse<LoginResponse> = yield call(
      api.activateUser,
      userId,
      activationToken
    );

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
