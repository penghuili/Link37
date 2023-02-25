import { all, call, fork, put, takeLatest } from 'redux-saga/effects';

import httpErrorCodes from '../../shared/js/httpErrorCodes';
import { LocalStorage } from '../../shared/js/LocalStorage';
import { routeHelpers } from '../../shared/react/routeHelpers';
import { appActionCreators } from '../app/appActions';
import { authActionCreators, authActionTypes } from './authActions';
import { checkRefreshToken, logoutFromAllDevices, signIn, signUp } from './authNetwork';

function* init() {
  yield put(authActionCreators.isCheckingRefreshToken(true));
  const { data } = yield call(checkRefreshToken);

  yield put(authActionCreators.isLoggedIn(!!data));
  yield put(authActionCreators.isCheckingRefreshToken(false));
}

function* hanldeSignUpPressed({ payload: { username, password } }) {
  yield put(authActionCreators.isLoading(true));
  const { error } = yield call(signUp, username, password);

  if (error) {
    if (error.errorCode === httpErrorCodes.ALREADY_EXISTS) {
      yield put(authActionCreators.setError('This username is used.'));
    } else {
      yield put(authActionCreators.setError('Sign up failed.'));
    }
  } else {
    yield call(routeHelpers.navigate, '/sign-in');
  }

  yield put(authActionCreators.isLoading(false));
}

function* hanldeSignInPressed({ payload: { username, password } }) {
  yield put(authActionCreators.isLoading(true));

  const { data, error } = yield call(signIn, username, password);
  if (error) {
    if (error.errorCode === httpErrorCodes.NOT_FOUND) {
      yield put(authActionCreators.setError('This username does not exist.'));
    } else {
      yield put(authActionCreators.setError('Sign in failed.'));
    }
  }

  yield put(authActionCreators.isLoggedIn(!!data));
  yield put(authActionCreators.isLoading(false));
}

function* hanldeLogOutPressed() {
  yield call(LocalStorage.resetTokens);
  yield put(appActionCreators.reset());
}

function* hanldeLogOutFromAllDevicesPressed() {
  yield put(authActionCreators.isLoading(true));
  const { data } = yield call(logoutFromAllDevices);
  if (data) {
    yield put(appActionCreators.reset());
  }
}

export function* authSagas() {
  yield fork(init);

  yield all([
    takeLatest(authActionTypes.SIGN_UP_PRESSED, hanldeSignUpPressed),
    takeLatest(authActionTypes.SIGN_IN_PRESSED, hanldeSignInPressed),
    takeLatest(authActionTypes.LOG_OUT_PRESSED, hanldeLogOutPressed),
    takeLatest(authActionTypes.LOG_OUT_FROM_ALL_DEVICES_PRESSED, hanldeLogOutFromAllDevicesPressed),
  ]);
}
