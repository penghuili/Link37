import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import { localStorageKeys } from '../../lib/constants';
import apps from '../../shared/js/apps';
import { LocalStorage } from '../../shared/js/LocalStorage';
import { orderByPosition } from '../../shared/js/position';
import { routeHelpers } from '../../shared/react/routeHelpers';
import { sharedActionCreators, sharedActionTypes } from '../../shared/react/store/sharedActions';
import { toastTypes } from '../../shared/react/store/sharedReducer';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { linksActionCreators, linksActionTypes } from './linksActions';
import {
  createGroup,
  createLink,
  createPage,
  deleteGroup,
  deleteLink,
  deletePage,
  fetchPage,
  fetchPages,
  getLinkMeta,
  groupLinks,
  increaseLinkTimes,
  noGroupLinksId,
  privatePage,
  publicPage,
  updateGroup,
  updateLink,
  updatePage,
} from './linksNetwork';
import { linksSelectors } from './linksSelectors';

function* handleIsLoggedIn({ payload: { loggedIn } }) {
  if (loggedIn) {
    yield put(sharedActionCreators.fetchSettingsRequested(apps.link37.name));
  }
}

function handleReset() {
  const keys = Object.keys(localStorage);
  (keys || [])
    .filter(key => key.startsWith(localStorageKeys.page))
    .forEach(key => {
      LocalStorage.remove(key);
    });
}

function* handleFetchPagesRequested() {
  const settings = yield select(sharedSelectors.getSettings);
  if (!settings) {
    yield take(sharedActionTypes.FETCH_SETTINGS_FINISHED);
  }

  const isAccountValid = yield select(sharedSelectors.isAccountValid);
  if (!isAccountValid) {
    return;
  }

  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(fetchPages);

  if (data) {
    yield put(linksActionCreators.setPages(data));
  }

  yield put(linksActionCreators.isLoading(false));
}

function getLocalStorageKey(pageId) {
  return `${localStorageKeys.page}${pageId}`;
}

function handleSetPage({ payload: { page } }) {
  if (!page) {
    return;
  }

  const localStorageKey = getLocalStorageKey(page.sid);
  LocalStorage.set(localStorageKey, page);
}

function* handleFetchPageRequested({ payload: { pageId } }) {
  if (!pageId) {
    return;
  }
  const pageInStore = yield select(linksSelectors.getDetails, pageId);
  if (pageInStore?.sid === pageId) {
    return;
  }

  yield put(linksActionCreators.isLoading(true));
  const localStorageKey = getLocalStorageKey(pageId);
  const cached = LocalStorage.get(localStorageKey);
  yield put(linksActionCreators.setPage(cached || null));

  const { data, error } = yield call(fetchPage, pageId);

  if (data) {
    yield put(linksActionCreators.setPage(data));
  }

  if (error) {
    yield put(linksActionCreators.setPage(null));
    LocalStorage.remove(localStorageKey);

    if (error.status === 401) {
      yield put(linksActionCreators.setFetchError('You need to login to view this page.'));
    }

    if (error.status === 403) {
      yield put(linksActionCreators.setFetchError('You do not have access to this page.'));
    }

    if (error.status === 404) {
      yield put(linksActionCreators.setFetchError('This page does not exist.'));
    }
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleCreatePagePressed({ payload: { title, note, showIndex, layout, showNote } }) {
  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(createPage, { title, note, showIndex, layout, showNote });

  if (data) {
    const pages = yield select(linksSelectors.getPages);
    yield put(linksActionCreators.setPages([data, ...(pages || [])]));

    yield call(routeHelpers.goBack);
    yield put(sharedActionCreators.setToast('Page is created!'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* updatePageInStore(newPage) {
  const pages = yield select(linksSelectors.getPages);
  yield put(
    linksActionCreators.setPages((pages || []).map(p => (p.sid === newPage.sid ? newPage : p)))
  );

  const pageDetails = yield select(linksSelectors.getDetails);
  if (pageDetails?.sid === newPage.sid) {
    yield put(linksActionCreators.setPage({ ...pageDetails, ...newPage }));
  }
}

function* handleUpdatePagePressed({
  payload: { pageId, title, note, showIndex, layout, showNote, position },
}) {
  yield put(linksActionCreators.isLoading(true));

  const pages = yield select(linksSelectors.getPages);
  const page = pages.find(p => p.sid === pageId || p.sortKey === pageId);
  const { data } = yield call(updatePage, page.decryptedPassword, pageId, {
    encrypted: page.encrypted,
    title,
    note,
    showIndex,
    layout,
    showNote,
    position,
  });

  if (data) {
    yield call(updatePageInStore, data);

    yield call(routeHelpers.goBack);
    if (position) {
      yield put(sharedActionCreators.setToast('Pages are re-ordered.'));
    } else {
      yield put(sharedActionCreators.setToast('Page is updated.'));
    }
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handlePublicPagePressed({ payload: { pageId } }) {
  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(publicPage, pageId, {
    password: page.decryptedPassword,
  });
  if (data) {
    yield call(updatePageInStore, data);

    yield put(sharedActionCreators.setToast('Your page is public now, share it with friends!'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handlePrivatePagePressed({ payload: { pageId } }) {
  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(privatePage, pageId);
  if (data) {
    yield call(updatePageInStore, data);

    yield put(sharedActionCreators.setToast('Your page is private now, only you can access.'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleDeletePagePressed({ payload: { pageId } }) {
  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(deletePage, pageId);

  if (data) {
    const pages = yield select(linksSelectors.getPages);
    yield put(linksActionCreators.setPages(pages.filter(p => p.sid !== pageId)));

    yield call(routeHelpers.goBack);
    yield put(sharedActionCreators.setToast('Page is deleted.'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleFetchLinkMetaRequested({ payload: { url } }) {
  yield put(linksActionCreators.isLoadingMeta(true));

  const { data } = yield call(getLinkMeta, url);

  if (data) {
    yield put(linksActionCreators.setLinkMeta(data));
  } else {
    yield put(linksActionCreators.setLinkMeta(null));
  }

  yield put(linksActionCreators.isLoadingMeta(false));
}

function* updateLinkInStore(newLink, { isNew, isDelete } = {}) {
  const page = yield select(linksSelectors.getDetails);
  if (page) {
    let links;
    if (isNew) {
      links = [newLink, ...(page.links || [])];
    } else if (isDelete) {
      links = (page.links || []).filter(l => l.sortKey !== newLink.id);
    } else {
      links = orderByPosition(
        (page.links || []).map(l => (l.sortKey === newLink.sortKey ? newLink : l))
      );
    }
    const newPage = groupLinks({
      ...page,
      links,
      groups: (page.groups || []).filter(group => group.sortKey !== noGroupLinksId),
    });
    yield put(linksActionCreators.setPage(newPage));
  }
}

function* handleCreateLinkPressed({ payload: { pageId, title, url, note, groupId, iconLink } }) {
  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(createLink, page.decryptedPassword, pageId, {
    title,
    url,
    note,
    groupId,
    iconLink,
  });

  if (data) {
    yield call(updateLinkInStore, data, { isNew: true });

    yield call(routeHelpers.goBack);
    yield put(sharedActionCreators.setToast('Link is created.'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleUpdateLinkPressed({
  payload: { pageId, linkId, title, url, note, groupId, position, iconLink, goBack, silent },
}) {
  if (!pageId || !linkId) {
    return;
  }

  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(updateLink, page.decryptedPassword, pageId, linkId, {
    title,
    url,
    note,
    groupId,
    position,
    iconLink,
  });

  if (data) {
    yield call(updateLinkInStore, data);

    if (goBack) {
      yield call(routeHelpers.goBack);
    }

    if (!silent) {
      yield put(sharedActionCreators.setToast('Link is updated.'));
    }
  } else {
    if (!silent) {
      yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
    }
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleIncreaseLinkTimesPressed({ payload: { pageId, linkId } }) {
  if (!pageId || !linkId) {
    return;
  }

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(increaseLinkTimes, page.decryptedPassword, pageId, linkId);

  if (data) {
    yield call(updateLinkInStore, data);
  }
}

function* handleDeleteLinkPressed({ payload: { pageId, linkId } }) {
  if (!pageId || !linkId) {
    return;
  }

  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(deleteLink, pageId, linkId);
  if (data) {
    yield call(updateLinkInStore, data, { isDelete: true });

    yield put(sharedActionCreators.setToast('Link is deleted.'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* updateGroupInStore(newGroup, { isNew, isDelete, areLinksDeleted } = {}) {
  const page = yield select(linksSelectors.getDetails);
  if (page) {
    let groups;
    let links = page.links;
    if (isNew) {
      groups = [newGroup, ...(page.groups || [])];
    } else if (isDelete) {
      groups = (page.groups || []).filter(l => l.sortKey !== newGroup.id);
      if (areLinksDeleted) {
        links = links.filter(l => l.groupId !== newGroup.sortKey);
      }
    } else {
      groups = page.groups.map(g => (g.sortKey === newGroup.sortKey ? newGroup : g));
    }
    const newPage = groupLinks({
      ...page,
      links,
      groups: orderByPosition(groups.filter(group => group.sortKey !== noGroupLinksId)),
    });

    yield put(linksActionCreators.setPage(newPage));
  }
}

function* handleCreateGroupPressed({ payload: { pageId, title } }) {
  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(createGroup, page.decryptedPassword, pageId, { title });

  if (data) {
    yield call(updateGroupInStore, data, { isNew: true });

    yield call(routeHelpers.goBack);
    yield put(sharedActionCreators.setToast('Group is created.'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleUpdateGroupPressed({ payload: { pageId, groupId, title, position, goBack } }) {
  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(updateGroup, page.decryptedPassword, pageId, groupId, {
    title,
    position,
  });

  if (data) {
    yield call(updateGroupInStore, data);

    if (goBack) {
      yield call(routeHelpers.goBack);
    }
    yield put(sharedActionCreators.setToast('Group is updated.'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleDeleteGroupPressed({ payload: { pageId, groupId, includeLinks } }) {
  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(deleteGroup, pageId, groupId, includeLinks);
  if (data) {
    yield call(updateGroupInStore, data, { isDelete: true, areLinksDeleted: includeLinks });

    yield put(sharedActionCreators.setToast('Group is deleted.'));
  } else {
    yield put(sharedActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

export function* linksSagas() {
  yield all([
    takeLatest(sharedActionTypes.IS_LOGGED_IN, handleIsLoggedIn),
    takeLatest(sharedActionTypes.RESET, handleReset),
    takeLatest(
      [linksActionTypes.FETCH_PAGES_REQUESTED, sharedActionTypes.TRY_SUCCEEDED],
      handleFetchPagesRequested
    ),
    takeLatest(linksActionTypes.FETCH_PAGE_REQUESTED, handleFetchPageRequested),
    takeLatest(linksActionTypes.SET_PAGE, handleSetPage),
    takeLatest(linksActionTypes.CREATE_PAGE_PRESSED, handleCreatePagePressed),
    takeLatest(linksActionTypes.UPDATE_PAGE_PRESSED, handleUpdatePagePressed),
    takeLatest(linksActionTypes.PUBLIC_PAGE_PRESSED, handlePublicPagePressed),
    takeLatest(linksActionTypes.PRIVATE_PAGE_PRESSED, handlePrivatePagePressed),
    takeLatest(linksActionTypes.DELETE_PAGE_PRESSED, handleDeletePagePressed),
    takeLatest(linksActionTypes.CREATE_LINK_PRESSED, handleCreateLinkPressed),
    takeLatest(linksActionTypes.FETCH_LINK_META_REQUESTED, handleFetchLinkMetaRequested),
    takeLatest(linksActionTypes.UPDATE_LINK_PRESSED, handleUpdateLinkPressed),
    takeLatest(linksActionTypes.INCREASE_LINK_TIMES_PRESSED, handleIncreaseLinkTimesPressed),
    takeLatest(linksActionTypes.DELETE_LINK_PRESSED, handleDeleteLinkPressed),
    takeLatest(linksActionTypes.CREATE_GROUP_PRESSED, handleCreateGroupPressed),
    takeLatest(linksActionTypes.UPDATE_GROUP_PRESSED, handleUpdateGroupPressed),
    takeLatest(linksActionTypes.DELETE_GROUP_PRESSED, handleDeleteGroupPressed),
  ]);
}
