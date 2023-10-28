import { connect } from 'react-redux';
import { groupActions, groupSelectors } from '../../store/group/groupStore';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import GroupAdd from './GroupAdd';

const mapStateToProps = (state, { params: { pageId } }) => ({
  pageId,
  page: pageSelectors.data.getStandaloneItem(state),
  isLoadingPage: pageSelectors.fetchItem.isPending(state),
  isCreating: groupSelectors.createItem.isPending(state, pageId),
});

const mapDispatchToProps = {
  onFetch: pageActions.fetchItemRequested,
  onCreate: groupActions.createRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdd);
