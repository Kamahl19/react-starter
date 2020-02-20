import { all, fork } from 'redux-saga/effects';

import { authSaga } from 'features/auth/ducks';

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
