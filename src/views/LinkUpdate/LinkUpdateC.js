import { connect } from 'react-redux';
import { linkActions, linkSelectors } from '../../store/link/linkStore';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import LinkUpdate from './LinkUpdate';

const mapStateToProps = (state, { params: { pageId, linkId } }) => ({
  pageId,
  linkId,
  page: pageSelectors.data.getStandaloneItem(state),
  link: linkSelectors.data.getItem(state, pageId, linkId),
  getLinkMeta: link => linkSelectors.data.getLinkMeta(state, link),
  isLoadingPage: pageSelectors.fetchItem.isPending(state),
  isUpdating: linkSelectors.updateItem.isPending(state, pageId),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemRequested,
  onFetchLinkMeta: linkActions.getLinkMetaRequested,
  onUpdate: linkActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkUpdate);
