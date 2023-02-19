import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import GroupUpdate from './GroupUpdate';

const mapStateToProps = (state, { params: { groupId } }) => ({
  isLoading: linksSelectors.isLoading(state),
  group: linksSelectors.getGroup(state, groupId),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPageRequested,
  onUpdate: linksActionCreators.updateGroupPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupUpdate);
