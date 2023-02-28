import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import Pages from './Pages';

const mapStateToProps = state => ({
  pages: linksSelectors.getPages(state),
  isLoading: linksSelectors.isLoading(state),
  // isAccountValid: sharedSelectors.isAccountValid(state),
  isAccountValid: false,
  // tried: sharedSelectors.tried(state),
  tried: true,
  isLoadingSettings: sharedSelectors.isLoadingSettings(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPagesRequested,
  onTry: sharedActionCreators.tryPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
