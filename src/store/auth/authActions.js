export const authActionTypes = {
  IS_CHECKING_REFRESH_TOKEN: 'auth/IS_CHECKING_REFRESH_TOKEN',
  IS_LOGGED_IN: 'auth/IS_LOGGED_IN',
  IS_LOADING: 'auth/IS_LOADING',
  SET_ERROR: 'auth/SET_ERROR',
  SIGN_UP_PRESSED: 'auth/SIGN_UP_PRESSED',
  SIGN_IN_PRESSED: 'auth/SIGN_IN_PRESSED',
  LOG_OUT_PRESSED: 'auth/LOG_OUT_PRESSED',
  LOG_OUT_FROM_ALL_DEVICES_PRESSED: 'auth/LOG_OUT_FROM_ALL_DEVICES_PRESSED',
};

export const authActionCreators = {
  isCheckingRefreshToken(isChecking) {
    return { type: authActionTypes.IS_CHECKING_REFRESH_TOKEN, payload: { isChecking } };
  },

  isLoggedIn(loggedIn) {
    return {
      type: authActionTypes.IS_LOGGED_IN,
      payload: { loggedIn },
    };
  },
  isLoading(loading) {
    return {
      type: authActionTypes.IS_LOADING,
      payload: { loading },
    };
  },
  setError(errorMessage) {
    return {
      type: authActionTypes.SET_ERROR,
      payload: { errorMessage },
    };
  },
  signUpPressed(username, password) {
    return { type: authActionTypes.SIGN_UP_PRESSED, payload: { username, password } };
  },
  signInPressed(username, password) {
    return { type: authActionTypes.SIGN_IN_PRESSED, payload: { username, password } };
  },
  logOutPressed() {
    return { type: authActionTypes.LOG_OUT_PRESSED };
  },
  logOutFromAllDevicesPressed() {
    return { type: authActionTypes.LOG_OUT_FROM_ALL_DEVICES_PRESSED };
  },
};
