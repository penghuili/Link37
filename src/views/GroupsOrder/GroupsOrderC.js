import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import GroupsOrder from './GroupsOrder';

const mapStateToProps = state => ({
  isLoading: linksSelectors.isLoading(state),
  page: linksSelectors.getDetails(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPageRequested,
  onUpdate: linksActionCreators.updateGroupPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsOrder);
