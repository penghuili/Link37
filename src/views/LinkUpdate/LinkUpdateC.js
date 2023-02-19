import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import LinkUpdate from './LinkUpdate';

const mapStateToProps = (state, { params: { linkId } }) => ({
  isLoading: linksSelectors.isLoading(state),
  link: linksSelectors.getLink(state, linkId),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPageRequested,
  onUpdate: linksActionCreators.updateLinkPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkUpdate);
