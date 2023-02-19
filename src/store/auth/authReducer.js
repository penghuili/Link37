import { appActionTypes } from '../app/appActions';
import { authActionTypes } from './authActions';

const initialState = {
  isCheckingRefreshToken: true,
  isLoggedIn: false,
  isLoading: false,
  errorMessage: null,
};

function handleIsCheckingRefreshToken(state, { isChecking }) {
  return { ...state, isCheckingRefreshToken: isChecking };
}

function handleSetUserData(state, { userId }) {
  return { ...state, userId };
}

function handleIsLoggedIn(state, { loggedIn }) {
  return { ...state, isLoggedIn: loggedIn };
}

function handleIsLoading(state, { loading }) {
  return { ...state, isLoading: loading };
}

function handleSetError(state, { errorMessage }) {
  return { ...state, errorMessage };
}

function handleReset() {
  return { ...initialState, isCheckingRefreshToken: false };
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActionTypes.IS_CHECKING_REFRESH_TOKEN:
      return handleIsCheckingRefreshToken(state, action.payload);

    case authActionTypes.SET_USER_DATA:
      return handleSetUserData(state, action.payload);

    case authActionTypes.IS_LOGGED_IN:
      return handleIsLoggedIn(state, action.payload);

    case authActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case authActionTypes.SET_ERROR:
      return handleSetError(state, action.payload);

    case appActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
