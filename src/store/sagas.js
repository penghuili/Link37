import { all } from 'redux-saga/effects';
import { accountSagas } from './account/accountSagas';

import { appSagas } from './app/appSagas';
import { authSagas } from './auth/authSagas';
import { linksSagas } from './links/linksSagas';

export function* sagas() {
  yield all([appSagas(), authSagas(), accountSagas(), linksSagas()]);
}
