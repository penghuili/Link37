import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import Pages from './Pages';

const mapStateToProps = state => ({
  pages: linksSelectors.getPages(state),
  isLoading: linksSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPagesRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
