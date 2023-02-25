import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import ChangePassword from './ChangePassword';

const mapStateToProps = state => ({
  isLoading: sharedSelectors.isLoadingAccount(state),
});

const mapDispatchToProps = {
  onChange: sharedActionCreators.changePasswordPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
