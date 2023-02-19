import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import GroupSelector from './GroupSelector';

const mapStateToProps = state => ({
  page: linksSelectors.getDetails(state),
});

const mapDispatchToProps = {
  onFetchPage: linksActionCreators.fetchPageRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);
