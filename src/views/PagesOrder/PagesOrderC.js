import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import PagesOrder from './PagesOrder';

const mapStateToProps = state => ({
  isLoading: linksSelectors.isLoading(state),
  pages: linksSelectors.getPages(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPagesRequested,
  onUpdate: linksActionCreators.updatePagePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesOrder);
