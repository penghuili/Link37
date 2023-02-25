import sharedSelectors from '../../shared/react/store/sharedSelectors';

export const linksSelectors = {
  isLoading: state => state.links.isLoading,
  getPages: state => state.links.pages,
  getLink: (state, linkId) =>
    linksSelectors.getDetails(state)?.links?.find(link => link.sortKey === linkId),
  getGroup: (state, groupId) =>
    linksSelectors.getDetails(state)?.groups?.find(group => group.sortKey === groupId),
  getDetails: state => state.links.details,
  isPageOwner: state => {
    const pageOwner = linksSelectors.getDetails(state)?.id;
    const userId = sharedSelectors.getAccount(state).userId;
    return !!pageOwner && pageOwner === userId;
  },
};
