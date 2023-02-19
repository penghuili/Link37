import { connect } from 'react-redux';

import { linksActionCreators } from '../../store/links/linksActions';
import { linksSelectors } from '../../store/links/linksSelectors';
import GroupAdd from './GroupAdd';

const mapStateToProps = state => ({
  isLoading: linksSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onCreate: linksActionCreators.createGroupPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupAdd);
