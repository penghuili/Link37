export const linksActionTypes = {
  IS_LOADING: 'links/IS_LOADING',
  SET_PAGES: 'links/SET_PAGES',
  SET_PAGE: 'links/SET_PAGE',
  FETCH_PAGES_REQUESTED: 'links/FETCH_PAGES_REQUESTED',
  FETCH_PAGE_REQUESTED: 'links/FETCH_PAGE_REQUESTED',
  CREATE_PAGE_PRESSED: 'links/CREATE_PAGE_PRESSED',
  UPDATE_PAGE_PRESSED: 'links/UPDATE_PAGE_PRESSED',
  DELETE_PAGE_PRESSED: 'links/DELETE_PAGE_PRESSED',
  CREATE_LINK_PRESSED: 'links/CREATE_LINK_PRESSED',
  UPDATE_LINK_PRESSED: 'links/UPDATE_LINK_PRESSED',
  DELETE_LINK_PRESSED: 'links/DELETE_LINK_PRESSED',
  CREATE_GROUP_PRESSED: 'links/CREATE_GROUP_PRESSED',
  UPDATE_GROUP_PRESSED: 'links/UPDATE_GROUP_PRESSED',
  DELETE_GROUP_PRESSED: 'links/DELETE_GROUP_PRESSED',
};

export const linksActionCreators = {
  isLoading(value) {
    return {
      type: linksActionTypes.IS_LOADING,
      payload: { value },
    };
  },
  setPages(pages) {
    return {
      type: linksActionTypes.SET_PAGES,
      payload: { pages },
    };
  },
  setPage(page) {
    return {
      type: linksActionTypes.SET_PAGE,
      payload: { page },
    };
  },
  fetchPagesRequested() {
    return { type: linksActionTypes.FETCH_PAGES_REQUESTED };
  },
  fetchPageRequested(pageId) {
    return { type: linksActionTypes.FETCH_PAGE_REQUESTED, payload: { pageId } };
  },
  createPagePressed({ title, note, showIndex, layout, showNote }) {
    return {
      type: linksActionTypes.CREATE_PAGE_PRESSED,
      payload: { title, note, showIndex, layout, showNote },
    };
  },
  updatePagePressed({ pageId, title, note, showIndex, layout, showNote, position }) {
    return {
      type: linksActionTypes.UPDATE_PAGE_PRESSED,
      payload: { pageId, title, note, showIndex, layout, showNote, position },
    };
  },
  deletePagePressed(pageId) {
    return {
      type: linksActionTypes.DELETE_PAGE_PRESSED,
      payload: { pageId },
    };
  },
  createLinkPressed({ pageId, title, url, note, groupId }) {
    return {
      type: linksActionTypes.CREATE_LINK_PRESSED,
      payload: { pageId, title, url, note, groupId },
    };
  },
  updateLinkPressed({ pageId, linkId, title, url, note, groupId, position, goBack }) {
    return {
      type: linksActionTypes.UPDATE_LINK_PRESSED,
      payload: { pageId, linkId, title, url, note, groupId, position, goBack },
    };
  },
  deleteLinkPressed(pageId, linkId) {
    return {
      type: linksActionTypes.DELETE_LINK_PRESSED,
      payload: { pageId, linkId },
    };
  },
  createGroupPressed({ pageId, title }) {
    return {
      type: linksActionTypes.CREATE_GROUP_PRESSED,
      payload: { pageId, title },
    };
  },
  updateGroupPressed({ pageId, groupId, title, position }) {
    return {
      type: linksActionTypes.UPDATE_GROUP_PRESSED,
      payload: { pageId, groupId, title, position },
    };
  },
  deleteGroupPressed(pageId, groupId) {
    return {
      type: linksActionTypes.DELETE_GROUP_PRESSED,
      payload: { pageId, groupId },
    };
  },
};
