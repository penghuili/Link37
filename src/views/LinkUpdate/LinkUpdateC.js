import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import LinkUpdate from './LinkUpdate';

const mapStateToProps = (state, { params: { linkId } }) => ({
  isLoading: linksSelectors.isLoading(state),
  link: linksSelectors.getLink(state, linkId),
  meta: linksSelectors.getLinkMeta(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPageRequested,
  onFetchLinkMeta: linksActionCreators.fetchLinkMetaRequested,
  onUpdate: linksActionCreators.updateLinkPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkUpdate);
