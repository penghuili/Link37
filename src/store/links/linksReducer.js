import { appActionTypes } from '../app/appActions';
import { linksActionTypes } from './linksActions';

const initialState = {
  isLoading: false,
  pages: [],
  details: null,
};

function handleSetPages(state, { pages }) {
  return { ...state, pages };
}

function handleSetPage(state, { page }) {
  return { ...state, details: page };
}

function handleIsLoading(state, { value }) {
  return { ...state, isLoading: value };
}

function handleReset() {
  return initialState;
}

export function linksReducer(state = initialState, action) {
  switch (action.type) {
    case linksActionTypes.SET_PAGES:
      return handleSetPages(state, action.payload);

    case linksActionTypes.SET_PAGE:
      return handleSetPage(state, action.payload);

    case linksActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case appActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
