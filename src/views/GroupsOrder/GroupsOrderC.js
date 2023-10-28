import { connect } from 'react-redux';
import { groupActions, groupSelectors } from '../../store/group/groupStore';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import GroupsOrder from './GroupsOrder';

const mapStateToProps = (state, { params: { pageId } }) => ({
  pageId,
  page: pageSelectors.data.getStandaloneItem(state),
  isLoadingPage: pageSelectors.fetchItem.isPending(state),
  isUpdating: groupSelectors.updateItem.isPending(state, pageId),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemRequested,
  onUpdate: groupActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsOrder);
