import { call, put } from 'redux-saga/effects';
import { safeGet, safeSet } from '../../shared/js/object';
import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import {
  createDataSelectors,
  createGeneralStore,
  createRequest,
  defaultId,
  mergeReducers,
  mergeSagas,
} from '../../shared/react/store/storeHelpers';
import { pageSelectors } from '../page/pageStore';
import {
  createLink,
  deleteLink,
  fetchLinkMeta,
  increaseLinkTimes,
  updateLink,
} from './linkNetwork';

export const linkDomain = 'link';

const dataSelectors = createDataSelectors(linkDomain);

const { actions, selectors, reducer, saga } = createGeneralStore(linkDomain, {
  createItem: function* ({ id, page, title, url, note, groupId, iconLink, onSucceeded }) {
    const result = yield call(createLink, page.decryptedPassword, id, {
      title,
      url,
      note,
      groupId,
      iconLink,
    });

    if (result.data && onSucceeded) {
      onSucceeded(result.data);
    }

    return result;
  },
  updateItem: function* ({ id, page, itemId, title, url, note, groupId, position, iconLink }) {
    const result = yield call(updateLink, page.decryptedPassword, id, itemId, {
      title,
      url,
      note,
      groupId,
      position,
      iconLink,
    });
    if (result.data) {
      yield put(sharedActionCreators.setToast('Link is encrypted and saved in server.'));
    }

    return result;
  },
  deleteItem: async ({ id, itemId, onSucceeded }) => {
    const result = await deleteLink(id, itemId);
    if (onSucceeded && result.data) {
      onSucceeded(itemId);
    }

    return result;
  },
});

function getLinkMeta(state, link) {
  return safeGet(state, [linkDomain, defaultId, 'data', 'linkMetas', link]);
}

const {
  actions: linkMetaActions,
  selectors: linkMetaSelectors,
  reducer: linkMetaReducer,
  saga: linkMetaSaga,
} = createRequest(linkDomain, 'linkMeta', {
  request: function* ({ link }) {
    const result = yield call(fetchLinkMeta, link);
    return result;
  },
  onReducerSucceeded: (state, { payload: { link }, data }) => {
    const newState = safeSet(state, [defaultId, 'data', 'linkMetas', link], data);
    return newState;
  },
});

const {
  actions: increaseLinkTimesActions,
  selectors: increaseLinkTimesSelectors,
  reducer: increaseLinkTimesReducer,
  saga: increaseLinkTimesSaga,
} = createRequest(linkDomain, 'increaseLinkTimes', {
  request: function* ({ pageId, page, linkId }) {
    const result = yield call(increaseLinkTimes, page.decryptedPassword, pageId, linkId);
    return result;
  },
});

export const linkActions = {
  createRequested: actions.createItem.requested.action,
  updateRequested: actions.updateItem.requested.action,
  deleteRequested: actions.deleteItem.requested.action,
  getLinkMetaRequested: linkMetaActions.requested.action,
  increaseLinkTimesRequested: increaseLinkTimesActions.requested.action,
};

export const linkSelectors = {
  ...selectors,
  data: {
    ...dataSelectors,
    getItem: (state, pageId, linkId) => {
      const page = pageSelectors.data.getStandaloneItem(state);
      if (page && page.sid === pageId) {
        return (page.links || []).find(link => link.sortKey === linkId);
      }

      return undefined;
    },
    getLinkMeta,
  },
  getLinkMeta: linkMetaSelectors,
  increaseLinkTimes: increaseLinkTimesSelectors,
};

export const linkReducer = mergeReducers([reducer, linkMetaReducer, increaseLinkTimesReducer]);

export const linkSagas = mergeSagas([saga, linkMetaSaga, increaseLinkTimesSaga]);
