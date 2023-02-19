import { connect } from 'react-redux';

import { appActionCreators } from '../../store/app/appActions';
import { authSelectors } from '../../store/auth/authSelectors';
import AppBar from './AppBar';

const mapStateToProps = state => ({
  isLoggedIn: authSelectors.isLoggedIn(state),
});

const mapDispatchToProps = {
  onBack: appActionCreators.goBack,
  onNav: appActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
