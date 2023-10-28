import { connect } from 'react-redux';
import { linkActions, linkSelectors } from '../../store/link/linkStore';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import LinkAdd from './LinkAdd';

const mapStateToProps = (state, { params: { pageId } }) => ({
  pageId,
  page: pageSelectors.data.getStandaloneItem(state),
  getLinkMeta: link => linkSelectors.data.getLinkMeta(state, link),
  isLoadingPage: pageSelectors.fetchItem.isPending(state),
  isCreating: linkSelectors.createItem.isPending(state, pageId),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemRequested,
  onFetchLinkMeta: linkActions.getLinkMetaRequested,
  onCreate: linkActions.createRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkAdd);
