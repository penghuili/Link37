import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { LocalStorage, LocalStorageKeys } from '../../lib/LocalStorage';

import { routeHelpers } from '../../lib/routeHelpers';
import { appActionCreators, appActionTypes } from './appActions';

function* init() {
  const openTime = yield call(LocalStorage.get, LocalStorageKeys.openTime);
  if (openTime) {
    yield call(LocalStorage.set, LocalStorageKeys.lastOpenTime, openTime);
  }
  
  yield call(LocalStorage.set, LocalStorageKeys.openTime, Date.now());
}

function* handleGoBack() {
  yield call(routeHelpers.goBack);
}

function* handleNavigate({ payload: { path } }) {
  yield call(routeHelpers.navigate, path);
}

function* handleChangeThemeModePressed({ payload: { themeMode } }) {
  yield call(LocalStorage.set, LocalStorageKeys.themeMode, themeMode);
  yield put(appActionCreators.setThemeMode(themeMode));
}

export function* appSagas() {
  yield fork(init);
  yield all([
    takeLatest(appActionTypes.GO_BACK, handleGoBack),
    takeLatest(appActionTypes.NAVIGATE, handleNavigate),
    takeLatest(appActionTypes.CHNAGE_THEME_MODE_PRESSED, handleChangeThemeModePressed),
  ]);
}
