import { sharedActionTypes } from '../../shared/react/store/sharedActions';
import { linksActionTypes } from './linksActions';

const initialState = {
  isLoading: false,
  pages: [],
  details: null,
  fetchError: null,
  linkMeta: null,
};

function handleSetPages(state, { pages }) {
  return { ...state, pages };
}

function handleSetPage(state, { page }) {
  return { ...state, details: page };
}

function handleSetFetchError(state, { error }) {
  return { ...state, fetchError: error };
}

function handleSetLinkMeta(state, { meta }) {
  return { ...state, linkMeta: meta };
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

    case linksActionTypes.SET_FETCH_ERROR:
      return handleSetFetchError(state, action.payload);

    case linksActionTypes.SET_LINK_META:
      return handleSetLinkMeta(state, action.payload);

    case linksActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case sharedActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
