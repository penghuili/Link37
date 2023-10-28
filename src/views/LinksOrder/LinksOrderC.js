import { connect } from 'react-redux';
import { groupSelectors } from '../../store/group/groupStore';
import { linkActions, linkSelectors } from '../../store/link/linkStore';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import LinksOrder from './LinksOrder';

const mapStateToProps = (state, { params: { pageId, groupId } }) => ({
  pageId,
  groupId,
  page: pageSelectors.data.getStandaloneItem(state),
  group: groupSelectors.data.getItem(state, pageId, groupId),
  isLoadingPage: pageSelectors.fetchItem.isPending(state),
  isUpdating: linkSelectors.updateItem.isPending(state, pageId),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemRequested,
  onUpdate: linkActions.updateRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinksOrder);
