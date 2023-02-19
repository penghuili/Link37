import { all } from 'redux-saga/effects';

import { appSagas } from './app/appSagas';
import { authSagas } from './auth/authSagas';
import { linksSagas } from './links/linksSagas';

export function* sagas() {
  yield all([appSagas(), authSagas(), linksSagas()]);
}
