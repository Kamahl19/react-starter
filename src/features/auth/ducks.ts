import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push, LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { createAction, ActionType } from 'typesafe-actions';

import { rootPath } from 'config';
import { t } from 'common/services/i18next';
import { loginActions } from 'common/services/user';
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

type ResetPasswordPayload = {
  email: string;
  password: string;
  passwordResetToken: string;
};

/**
 * ACTIONS
 */
export const signUpAction = createAction('auth/SIGN_UP')<SignupPayload>();
export const forgottenPasswordAction = createAction('auth/FORGOTTEN_PASSWORD')<
  ForgottenPasswordPayload
>();
export const resetPasswordAction = createAction('auth/RESET_PASSWORD')<ResetPasswordPayload>();

const actions = { signUpAction, forgottenPasswordAction, resetPasswordAction };
export type AuthAction = ActionType<typeof actions>;

/**
 * SAGAS
 */
function* signUp({ payload: { email, password } }: ReturnType<typeof signUpAction>) {
  try {
    const resp = yield call(api.signUp, email, password);

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
    const resp = yield call(api.resetPassword, email, password, passwordResetToken);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* locationChanged({ payload }: LocationChangeAction) {
  const activatePath = '/activate/';

  if (payload.location.pathname.includes(activatePath)) {
    const exclude = activatePath.split('/');
    const [userId, activationToken] = payload.location.pathname
      .split('/')
      .filter(part => !exclude.includes(part));

    yield call(activateUser, userId, activationToken);
  }
}

function* activateUser(userId: string, activationToken: string) {
  try {
    const resp = yield call(api.activateUser, userId, activationToken);

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
  yield takeEvery(LOCATION_CHANGE, locationChanged);
}
