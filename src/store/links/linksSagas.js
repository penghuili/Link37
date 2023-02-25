import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { routeHelpers } from '../../shared/react/routeHelpers';
import { appActionCreators } from '../app/appActions';
import { toastTypes } from '../app/appReducer';
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
  groupLinks,
  privatePage,
  publicPage,
  updateGroup,
  updateLink,
  updatePage,
} from './linksNetwork';
import { linksSelectors } from './linksSelectors';

function* handleFetchPagesRequested() {
  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(fetchPages);

  if (data) {
    yield put(linksActionCreators.setPages(data));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleFetchPageRequested({ payload: { pageId } }) {
  if (!pageId) {
    return;
  }

  yield put(linksActionCreators.isLoading(true));
  yield put(linksActionCreators.setPage(null));

  const { data } = yield call(fetchPage, pageId);

  if (data) {
    yield put(linksActionCreators.setPage(data));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleCreatePagePressed({ payload: { title, note, showIndex, layout, showNote } }) {
  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(createPage, { title, note, showIndex, layout, showNote });

  if (data) {
    yield call(routeHelpers.goBack);
    yield put(appActionCreators.setToast('Page is created!'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleUpdatePagePressed({
  payload: { pageId, title, note, showIndex, layout, showNote, position },
}) {
  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
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
    yield call(routeHelpers.goBack);
    yield put(appActionCreators.setToast('Page is updated.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
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
    yield put(linksActionCreators.setPage({ ...page, ...data }));
    yield put(appActionCreators.setToast('Your page is public now, share it with friends!'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handlePrivatePagePressed({ payload: { pageId } }) {
  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(privatePage, pageId);
  if (data) {
    yield put(linksActionCreators.setPage({ ...page, ...data }));
    yield put(appActionCreators.setToast('Your page is private now, only you can access.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleDeletePagePressed({ payload: { pageId } }) {
  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(deletePage, pageId);

  if (data) {
    yield call(routeHelpers.goBack);
    yield put(appActionCreators.setToast('Page is deleted.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleCreateLinkPressed({ payload: { pageId, title, url, note, groupId } }) {
  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(createLink, page.decryptedPassword, pageId, {
    title,
    url,
    note,
    groupId,
  });

  if (data) {
    yield call(routeHelpers.goBack);
    yield put(appActionCreators.setToast('Link is created.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleUpdateLinkPressed({
  payload: { pageId, linkId, title, url, note, groupId, position, goBack },
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
  });

  if (data) {
    if (goBack) {
      yield call(routeHelpers.goBack);
    }
    yield put(appActionCreators.setToast('Link is updated.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleDeleteLinkPressed({ payload: { pageId, linkId } }) {
  if (!pageId || !linkId) {
    return;
  }

  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(deleteLink, pageId, linkId);
  if (data) {
    const page = yield select(linksSelectors.getDetails);
    const updated = { ...page, links: page.links.filter(link => link.sortKey !== linkId) };
    const sorted = groupLinks(updated);
    yield put(linksActionCreators.setPage(sorted));
    yield put(appActionCreators.setToast('Link is deleted.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleCreateGroupPressed({ payload: { pageId, title } }) {
  yield put(linksActionCreators.isLoading(true));

  const page = yield select(linksSelectors.getDetails);
  const { data } = yield call(createGroup, page.decryptedPassword, pageId, { title });

  if (data) {
    yield call(routeHelpers.goBack);
    yield put(appActionCreators.setToast('Group is created.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
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
    if (goBack) {
      yield call(routeHelpers.goBack);
    }
    yield put(appActionCreators.setToast('Group is updated.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

function* handleDeleteGroupPressed({ payload: { pageId, groupId } }) {
  yield put(linksActionCreators.isLoading(true));

  const { data } = yield call(deleteGroup, pageId, groupId);
  if (data) {
    const page = yield select(linksSelectors.getDetails);
    const updated = { ...page, groups: page.groups.filter(item => item.sortKey !== groupId) };
    const sorted = groupLinks(updated);
    yield put(linksActionCreators.setPage(sorted));
    yield put(appActionCreators.setToast('Group is deleted.'));
  } else {
    yield put(appActionCreators.setToast('Something went wrong.', toastTypes.critical));
  }

  yield put(linksActionCreators.isLoading(false));
}

export function* linksSagas() {
  yield all([
    takeLatest(linksActionTypes.FETCH_PAGES_REQUESTED, handleFetchPagesRequested),
    takeLatest(linksActionTypes.FETCH_PAGE_REQUESTED, handleFetchPageRequested),
    takeLatest(linksActionTypes.CREATE_PAGE_PRESSED, handleCreatePagePressed),
    takeLatest(linksActionTypes.UPDATE_PAGE_PRESSED, handleUpdatePagePressed),
    takeLatest(linksActionTypes.PUBLIC_PAGE_PRESSED, handlePublicPagePressed),
    takeLatest(linksActionTypes.PRIVATE_PAGE_PRESSED, handlePrivatePagePressed),
    takeLatest(linksActionTypes.DELETE_PAGE_PRESSED, handleDeletePagePressed),
    takeLatest(linksActionTypes.CREATE_LINK_PRESSED, handleCreateLinkPressed),
    takeLatest(linksActionTypes.UPDATE_LINK_PRESSED, handleUpdateLinkPressed),
    takeLatest(linksActionTypes.DELETE_LINK_PRESSED, handleDeleteLinkPressed),
    takeLatest(linksActionTypes.CREATE_GROUP_PRESSED, handleCreateGroupPressed),
    takeLatest(linksActionTypes.UPDATE_GROUP_PRESSED, handleUpdateGroupPressed),
    takeLatest(linksActionTypes.DELETE_GROUP_PRESSED, handleDeleteGroupPressed),
  ]);
}
