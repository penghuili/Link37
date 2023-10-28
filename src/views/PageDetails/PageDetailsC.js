import { connect } from 'react-redux';
import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { groupActions, groupSelectors } from '../../store/group/groupStore';
import { linkActions, linkSelectors } from '../../store/link/linkStore';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import PageDetails from './PageDetails';

const mapStateToProps = (state, { params: { pageId } }) => ({
  pageId,
  page: pageSelectors.data.getStandaloneItem(state),
  fetchError: pageSelectors.fetchItem.getError(state),
  isLoading: pageSelectors.fetchItem.isPending(state),
  isDeleting: pageSelectors.deleteItem.isPending(state),
  isDeletingGroup: groupSelectors.deleteItem.isPending(state),
  isDeletingLink: linkSelectors.deleteItem.isPending(state),
  isIncreasingLinkTimes: linkSelectors.increaseLinkTimes.isPending(state),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemRequested,
  onDeleteLink: linkActions.deleteRequested,
  onDeleteGroup: groupActions.deleteRequested,
  onDeletePage: pageActions.deleteRequested,
  onIncreaseLinkTimes: linkActions.increaseLinkTimesRequested,
  onNav: sharedActionCreators.navigate,
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetails);
