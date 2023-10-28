import { connect } from 'react-redux';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import PageUpdate from './PageUpdate';

const mapStateToProps = (state, { params: { pageId } }) => ({
  pageId,
  page: pageSelectors.data.getStandaloneItem(state),
  isLoading: pageSelectors.fetchItem.isPending(state),
  isUpdating: pageSelectors.updateItem.isPending(state),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemRequested,
  onUpdate: pageActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageUpdate);
