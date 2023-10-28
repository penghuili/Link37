import { all } from 'redux-saga/effects';
import { sharedSagas } from '../shared/react/store/sharedSaga';
import { groupSagas } from './group/groupStore';
import { linkSagas } from './link/linkStore';
import { pageSagas } from './page/pageStore';

export function* sagas() {
  yield all([sharedSagas(), pageSagas(), linkSagas(), groupSagas()]);
}
