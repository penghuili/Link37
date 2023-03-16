import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import LinkAdd from './LinkAdd';

const mapStateToProps = state => ({
  isLoading: linksSelectors.isLoading(state),
  meta: linksSelectors.getLinkMeta(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPageRequested,
  onFetchLinkMeta: linksActionCreators.fetchLinkMetaRequested,
  onCreate: linksActionCreators.createLinkPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkAdd);
