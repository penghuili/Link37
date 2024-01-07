import { connect } from 'react-redux';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import Pages from './Pages';

const mapStateToProps = state => ({
  pages: pageSelectors.data.getItems(state),
  isLoading: pageSelectors.fetchItems.isPending(state),
  isLoadingSettings: sharedSelectors.isLoadingSettings(state),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemsRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
