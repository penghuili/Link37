import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { appActionCreators } from '../app/appActions';
import { toastTypes } from '../app/appReducer';
import { authActionCreators, authActionTypes } from '../auth/authActions';
import { accountActionCreators, accountActionTypes } from './accountActions';
import { changePassword, deleteAccount, fetchAccount } from './accountNetwork';
import { accountSelectors } from './accountSelectors';

function* handleIsLoggedIn({ payload: { loggedIn } }) {
  if (loggedIn) {
    yield put(accountActionCreators.fetchRequested());
  }
}

function* handleFetchRequested() {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(fetchAccount);

  if (data) {
    yield put(accountActionCreators.setUserData(data));
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleDeletePressed() {
  yield put(accountActionCreators.isLoading(true));

  const { data } = yield call(deleteAccount);

  if (data) {
    yield put(authActionCreators.logOutPressed());
    yield put(appActionCreators.setToast('Your account is deleted.'));
  } else {
    yield put(
      appActionCreators.setToast('Something went wrong, please try again.', toastTypes.critical)
    );
  }

  yield put(accountActionCreators.isLoading(false));
}

function* handleChangePasswordPressed({ payload: { currentPassword, newPassword } }) {
  yield put(accountActionCreators.isLoading(true));

  const { username } = yield select(accountSelectors.getAccount);
  const { data } = yield call(changePassword, username, currentPassword, newPassword);

  if (data) {
    yield put(accountActionCreators.setUserData(data));
    yield put(appActionCreators.setToast('Your password is changed! Please login again.'));
    yield put(authActionCreators.logOutPressed());
  } else {
    yield put(
      appActionCreators.setToast(
        'Something went wrong, your current password may be wrong.',
        toastTypes.critical
      )
    );
  }

  yield put(accountActionCreators.isLoading(false));
}

export function* accountSagas() {
  yield all([
    takeLatest(authActionTypes.IS_LOGGED_IN, handleIsLoggedIn),
    takeLatest(accountActionTypes.FETCH_REQUESTED, handleFetchRequested),
    takeLatest(accountActionTypes.DELETE_PRESSED, handleDeletePressed),
    takeLatest(accountActionTypes.CHANGE_PASSWORD_PRESSED, handleChangePasswordPressed),
  ]);
}
