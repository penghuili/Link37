import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import Pages from './Pages';

const mapStateToProps = state => ({
  pages: linksSelectors.getPages(state),
  isLoading: linksSelectors.isLoading(state),
  isAccountValid: sharedSelectors.isAccountValid(state),
  tried: sharedSelectors.tried(state),
  isLoadingSettings: sharedSelectors.isLoadingSettings(state),
  isTrying: sharedSelectors.isTrying(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPagesRequested,
  onTry: sharedActionCreators.tryPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
