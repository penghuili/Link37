import { LocalStorage, sharedLocalStorageKeys } from '../../shared/js/LocalStorage';
import { appActionTypes } from './appActions';

export const toastTypes = {
  normal: 'normal',
  info: 'info',
  critical: 'critical',
};

const initialState = {
  themeMode: LocalStorage.get(sharedLocalStorageKeys.themeMode) || 'dark',
  toast: null,
};

function handleSetThemeMode(state, { themeMode }) {
  return { ...state, themeMode };
}

function handleSetToast(state, { message, type }) {
  return { ...state, toast: { message, type: type || toastTypes.normal } };
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.SET_THEME_MODE:
      return handleSetThemeMode(state, action.payload);

    case appActionTypes.SET_TOAST:
      return handleSetToast(state, action.payload);

    default:
      return state;
  }
}
