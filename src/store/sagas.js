import { all } from 'redux-saga/effects';

import { sharedSagas } from '../shared/react/store/sharedSaga';
import { linksSagas } from './links/linksSagas';

export function* sagas() {
  yield all([linksSagas(), sharedSagas()]);
}
