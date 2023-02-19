export const appActionTypes = {
  SET_THEME_MODE: 'app/SET_THEME_MODE',
  SET_TOAST: 'app/SET_TOAST',
  RESET: 'app/RESET',
  GO_BACK: 'app/GO_BACK',
  NAVIGATE: 'app/NAVIGATE',

  CHNAGE_THEME_MODE_PRESSED: 'app/CHNAGE_THEME_MODE_PRESSED',
};

export const appActionCreators = {
  setThemeMode(themeMode) {
    return { type: appActionTypes.SET_THEME_MODE, payload: { themeMode } };
  },
  setToast(message, type) {
    return { type: appActionTypes.SET_TOAST, payload: { message, type } };
  },
  reset() {
    return { type: appActionTypes.RESET };
  },
  goBack() {
    return { type: appActionTypes.GO_BACK };
  },
  navigate(path) {
    return { type: appActionTypes.NAVIGATE, payload: { path } };
  },
  changeThemeModePressed(themeMode) {
    return { type: appActionTypes.CHNAGE_THEME_MODE_PRESSED, payload: { themeMode } };
  },
};
