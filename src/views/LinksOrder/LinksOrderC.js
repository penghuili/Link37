import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import LinksOrder from './LinksOrder';

const mapStateToProps = (state, { params: { groupId } }) => ({
  isLoading: linksSelectors.isLoading(state),
  group: linksSelectors.getGroup(state, groupId),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPageRequested,
  onUpdate: linksActionCreators.updateLinkPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinksOrder);
