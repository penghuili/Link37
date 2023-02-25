import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import PageDetails from './PageDetails';

const mapStateToProps = state => ({
  page: linksSelectors.getDetails(state),
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
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetails);
