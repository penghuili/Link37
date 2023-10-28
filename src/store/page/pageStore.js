import { call, put, select, takeLatest } from 'redux-saga/effects';
import { prepend, safeGet, safeSet } from '../../shared/js/object';
import { orderByPosition } from '../../shared/js/position';
import { idbStorage } from '../../shared/react/indexDB';
import { sharedActionCreators, sharedActionTypes } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import {
  createDataSelectors,
  createGeneralStore,
  createRequest,
  defaultId,
  mergeReducers,
  mergeSagas,
} from '../../shared/react/store/storeHelpers';
import { groupDomain } from '../group/groupStore';
import { groupLinks } from '../link/linkNetwork';
import { linkDomain } from '../link/linkStore';
import {
  createPage,
  deletePage,
  fetchPage,
  fetchPages,
  pageCache,
  privatePage,
  publicPage,
  updatePage,
} from './pageNetwork';

export const pageDomain = 'page';

const dataSelectors = createDataSelectors(pageDomain);

const { actions, selectors, reducer, saga } = createGeneralStore(pageDomain, {
  preFetchItems: function* () {
    const pages = yield select(dataSelectors.getItems);
    if (pages?.length) {
      return { continueCall: false };
    }

    const cachedPages = yield call(pageCache.getCachedItems);
    if (cachedPages?.length) {
      yield put(actions.fetchItems.succeeded.action({ data: { items: cachedPages } }));
    }

    return { continueCall: true };
  },
  fetchItems: async () => {
    return fetchPages();
  },
  preFetchItem: function* ({ itemId }) {
    const cachedPage = yield call(pageCache.getCachedItem, itemId);
    if (cachedPage) {
      yield put(actions.fetchItem.succeeded.action({ data: cachedPage, payload: { itemId } }));
    }

    return { continueCall: true };
  },
  fetchItem: async ({ itemId }) => {
    return fetchPage(itemId);
  },
  createItem: function* ({ title, note, showIndex, layout, showNote, onSucceeded }) {
    const result = yield call(createPage, { title, note, showIndex, layout, showNote });

    if (result.data && onSucceeded) {
      onSucceeded(result.data);
    }

    return result;
  },
  updateItem: function* ({
    itemId,
    page,
    title,
    note,
    showIndex,
    layout,
    showNote,
    position,
    onSucceeded,
  }) {
    const result = yield call(updatePage, page.decryptedPassword, itemId, {
      title,
      note,
      showIndex,
      layout,
      showNote,
      position,
    });
    if (result.data) {
      yield put(sharedActionCreators.setToast('Page is encrypted and saved in server.'));

      if (onSucceeded) {
        onSucceeded(result.data);
      }
    }

    return result;
  },
  deleteItem: async ({ itemId, onSucceeded }) => {
    const result = await deletePage(itemId);
    if (onSucceeded && result.data) {
      onSucceeded(itemId);
    }

    return result;
  },
});

const {
  actions: publicPageActions,
  selectors: publicPageSelectors,
  reducer: publicPageReducer,
  saga: publicPageSaga,
} = createRequest(pageDomain, 'publicPage', {
  request: function* ({ pageId, onSucceeded }) {
    const page = yield select(dataSelectors.getStandaloneItem);
    if (!page) {
      return;
    }

    const result = yield call(publicPage, pageId, { password: page.decryptedPassword });
    if (result.data) {
      yield put(sharedActionCreators.setToast('Your page is public now, share it with friends!'));

      if (onSucceeded) {
        onSucceeded(result.data);
      }
    }
    return result;
  },
  onReducerSucceeded: (state, { data }) => {
    const newState = safeSet(state, [defaultId, 'data', 'item'], data);
    return newState;
  },
});

const {
  actions: privatePageActions,
  selectors: privatePageSelectors,
  reducer: privatePageReducer,
  saga: privatePageSaga,
} = createRequest(pageDomain, 'privatePage', {
  request: function* ({ pageId, onSucceeded }) {
    const result = yield call(privatePage, pageId);
    if (result.data) {
      yield put(sharedActionCreators.setToast('Your page is private now, only you can access.'));
      if (onSucceeded) {
        onSucceeded(result.data);
      }
    }
    return result;
  },
  onReducerSucceeded: (state, { data }) => {
    let newState = safeSet(state, [defaultId, 'data', 'item'], data);
    newState = prepend(newState, [defaultId, 'data', 'items'], data);
    return newState;
  },
});

const customReducer = (state = {}, action) => {
  switch (action.type) {
    case `${groupDomain}/createItem/SUCCEEDED`: {
      const {
        payload: { data },
      } = action;
      const page = safeGet(state, [defaultId, 'data', 'item']);
      if (page && page.sortKey === data.id) {
        const newPage = {
          ...page,
          groups: [data, ...(page.groups || [])],
        };
        pageCache.cacheItem(page.sid, newPage);
        const newState = safeSet(state, [defaultId, 'data', 'item'], newPage);
        return newState;
      }
      return state;
    }

    case `${groupDomain}/updateItem/SUCCEEDED`: {
      const {
        payload: { data },
      } = action;
      const page = safeGet(state, [defaultId, 'data', 'item']);
      if (page && page.sortKey === data.id) {
        const newPage = {
          ...page,
          groups: orderByPosition(
            page.groups.map(g => (g.sortKey === data.sortKey ? { ...g, ...data } : g))
          ),
        };
        pageCache.cacheItem(page.sid, newPage);
        const newState = safeSet(state, [defaultId, 'data', 'item'], newPage);
        return newState;
      }
      return state;
    }

    case `${groupDomain}/deleteItem/SUCCEEDED`: {
      const {
        payload: {
          payload: { id, itemId, includeLinks },
        },
      } = action;
      const page = safeGet(state, [defaultId, 'data', 'item']);
      if (page && page.sid === id) {
        const links = includeLinks
          ? (page.links || []).filter(link => link.groupId !== itemId)
          : page.links || [];
        const newPage = groupLinks({
          ...page,
          links,
          groups: page.groups.filter(g => g.sortKey !== itemId),
        });
        pageCache.cacheItem(page.sid, newPage);
        const newState = safeSet(state, [defaultId, 'data', 'item'], newPage);
        return newState;
      }
      return state;
    }

    case `${linkDomain}/createItem/SUCCEEDED`: {
      const {
        payload: { data },
      } = action;
      const page = safeGet(state, [defaultId, 'data', 'item']);
      if (page && page.sortKey === data.id) {
        const newPage = groupLinks({
          ...page,
          links: [data, ...(page.links || [])],
        });
        pageCache.cacheItem(page.sid, newPage);
        const newState = safeSet(state, [defaultId, 'data', 'item'], newPage);
        return newState;
      }
      return state;
    }

    case `${linkDomain}/updateItem/SUCCEEDED`: {
      const {
        payload: { data },
      } = action;
      const page = safeGet(state, [defaultId, 'data', 'item']);
      if (page && page.sortKey === data.id) {
        const newPage = groupLinks({
          ...page,
          links: orderByPosition(
            (page.links || []).map(link => (link.sortKey === data.sortKey ? data : link))
          ),
        });
        pageCache.cacheItem(page.sid, newPage);
        const newState = safeSet(state, [defaultId, 'data', 'item'], newPage);
        return newState;
      }
      return state;
    }

    case `${linkDomain}/deleteItem/SUCCEEDED`: {
      const {
        payload: {
          payload: { id, itemId },
        },
      } = action;
      const page = safeGet(state, [defaultId, 'data', 'item']);
      if (page && page.sid === id) {
        const newPage = groupLinks({
          ...page,
          links: (page.links || []).filter(link => link.sortKey !== itemId),
        });
        pageCache.cacheItem(page.sid, newPage);
        const newState = safeSet(state, [defaultId, 'data', 'item'], newPage);
        return newState;
      }
      return state;
    }

    default:
      return state;
  }
};

function* customSaga() {
  yield takeLatest(sharedActionTypes.RESET, function* () {
    yield call(idbStorage.clear);
  });
}

export const pageActions = {
  fetchItemsRequested: actions.fetchItems.requested.action,
  fetchItemRequested: actions.fetchItem.requested.action,
  createRequested: actions.createItem.requested.action,
  updateRequested: actions.updateItem.requested.action,
  deleteRequested: actions.deleteItem.requested.action,
  publicPageRequested: publicPageActions.requested.action,
  privatePageRequested: privatePageActions.requested.action,
};

export const pageSelectors = {
  ...selectors,
  data: {
    ...dataSelectors,
    isPageOwner: state => {
      const pageOwner = pageSelectors.data.getStandaloneItem(state)?.id;
      const userId = sharedSelectors.getAccount(state).userId;
      return !!pageOwner && pageOwner === userId;
    },
  },
  publicPage: publicPageSelectors,
  privatePage: privatePageSelectors,
};

export const pageReducer = mergeReducers([
  reducer,
  publicPageReducer,
  privatePageReducer,
  customReducer,
]);

export const pageSagas = mergeSagas([saga, publicPageSaga, privatePageSaga, customSaga]);
