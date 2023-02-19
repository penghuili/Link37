export const accountActionTypes = {
  IS_LOADING: 'account/IS_LOADING',
  SET_USER_DATA: 'account/SET_USER_DATA',
  FETCH_REQUESTED: 'account/FETCH_REQUESTED',
  DELETE_PRESSED: 'account/DELETE_PRESSED',
  CHANGE_PASSWORD_PRESSED: 'account/CHANGE_PASSWORD_PRESSED',
};

export const accountActionCreators = {
  isLoading(loading) {
    return { type: accountActionTypes.IS_LOADING, payload: { loading } };
  },
  setUserData({ userId, username, createdAt }) {
    return {
      type: accountActionTypes.SET_USER_DATA,
      payload: { userId, username, createdAt },
    };
  },
  fetchRequested() {
    return { type: accountActionTypes.FETCH_REQUESTED };
  },
  deletePressed() {
    return { type: accountActionTypes.DELETE_PRESSED };
  },
  changePasswordPressed(currentPassword, newPassword) {
    return {
      type: accountActionTypes.CHANGE_PASSWORD_PRESSED,
      payload: { currentPassword, newPassword },
    };
  },
};
