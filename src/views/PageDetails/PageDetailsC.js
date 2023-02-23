import { connect } from 'react-redux';
import { appActionCreators } from '../../store/app/appActions';

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
  onNav: appActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetails);
