import { connect } from 'react-redux';
import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import Pages from './Pages';

const mapStateToProps = state => ({
  pages: pageSelectors.data.getItems(state),
  isLoading: pageSelectors.fetchItems.isPending(state),
  isAccountValid: sharedSelectors.isAccountValid(state),
  tried: sharedSelectors.tried(state),
  isLoadingSettings: sharedSelectors.isLoadingSettings(state),
  isTrying: sharedSelectors.isTrying(state),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemsRequested,
  onTry: sharedActionCreators.tryPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
