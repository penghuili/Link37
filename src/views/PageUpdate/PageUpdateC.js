import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import PageUpdate from './PageUpdate';

const mapStateToProps = state => ({
  isLoading: linksSelectors.isLoading(state),
  page: linksSelectors.getDetails(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPageRequested,
  onUpdate: linksActionCreators.updatePagePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageUpdate);
