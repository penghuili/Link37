import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import PageAdd from './PageAdd';

const mapStateToProps = state => ({
  isLoading: linksSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onCreate: linksActionCreators.createPagePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageAdd);
