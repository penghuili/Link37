import { call, put } from 'redux-saga/effects';
import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { createDataSelectors, createGeneralStore } from '../../shared/react/store/storeHelpers';
import { pageSelectors } from '../page/pageStore';
import { createGroup, deleteGroup, updateGroup } from './groupNetwork';

export const groupDomain = 'group';

const dataSelectors = createDataSelectors(groupDomain);

const { actions, selectors, reducer, saga } = createGeneralStore(groupDomain, {
  createItem: function* ({ id, page, title, onSucceeded }) {
    const result = yield call(createGroup, page.decryptedPassword, id, { title });

    if (result.data && onSucceeded) {
      onSucceeded(result.data);
    }

    return result;
  },
  updateItem: function* ({ id, page, itemId, title, position }) {
    const result = yield call(updateGroup, page.decryptedPassword, id, itemId, {
      title,
      position,
    });
    if (result.data) {
      yield put(sharedActionCreators.setToast('Page is encrypted and saved in server.'));
    }

    return result;
  },
  deleteItem: async ({ id, itemId, includeLinks, onSucceeded }) => {
    const result = await deleteGroup(id, itemId, includeLinks);
    if (onSucceeded && result.data) {
      onSucceeded(itemId);
    }

    return result;
  },
});

export const groupActions = {
  createRequested: actions.createItem.requested.action,
  updateRequested: actions.updateItem.requested.action,
  deleteRequested: actions.deleteItem.requested.action,
};

export const groupSelectors = {
  ...selectors,
  data: {
    ...dataSelectors,
    getItem: (state, pageId, groupId) => {
      const page = pageSelectors.data.getStandaloneItem(state);
      if (page && page.sid === pageId) {
        return (page.groups || []).find(g => g.sortKey === groupId);
      }

      return undefined;
    },
  },
};

export const groupReducer = reducer;

export const groupSagas = saga;
