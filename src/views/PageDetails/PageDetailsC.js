import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import PageDetails from './PageDetails';

const mapStateToProps = state => ({
  page: linksSelectors.getDetails(state),
  fetchError: linksSelectors.getFetchError(state),
  isLoading: linksSelectors.isLoading(state),
  isOwner: linksSelectors.isPageOwner(state),
});

const mapDispatchToProps = {
  onFetch: linksActionCreators.fetchPageRequested,
  onPublic: linksActionCreators.publicPagePressed,
  onPrivate: linksActionCreators.privatePagePressed,
  onDeleteLink: linksActionCreators.deleteLinkPressed,
  onDeleteGroup: linksActionCreators.deleteGroupPressed,
  onDeletePage: linksActionCreators.deletePagePressed,
  onUpdateLink: linksActionCreators.updateLinkPressed,
  onNav: sharedActionCreators.navigate,
  onToast: sharedActionCreators.setToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetails);
