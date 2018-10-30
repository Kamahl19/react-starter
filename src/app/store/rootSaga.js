import { all, fork } from 'redux-saga/effects';

import { userSaga } from '../../common/services/user';
import { authSaga } from '../../features/auth/ducks'; // TODO

export default function* rootSaga() {
  yield all([fork(userSaga), fork(authSaga)]);
}
