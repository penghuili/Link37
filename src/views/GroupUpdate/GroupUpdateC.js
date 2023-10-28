import { connect } from 'react-redux';
import { groupActions, groupSelectors } from '../../store/group/groupStore';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import GroupUpdate from './GroupUpdate';

const mapStateToProps = (state, { params: { pageId, groupId } }) => ({
  pageId,
  groupId,
  page: pageSelectors.data.getStandaloneItem(state),
  group: groupSelectors.data.getItem(state, pageId, groupId),
  isLoadingPage: pageSelectors.fetchItem.isPending(state),
  isUpdating: groupSelectors.updateItem.isPending(state, pageId),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemRequested,
  onUpdate: groupActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupUpdate);
