import { connect } from 'react-redux';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import PagesOrder from './PagesOrder';

const mapStateToProps = state => ({
  pages: pageSelectors.data.getItems(state),
  isLoading: pageSelectors.fetchItems.isPending(state),
  isUpdating: pageSelectors.updateItem.isPending(state),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemsRequested,
  onUpdate: pageActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(PagesOrder);
