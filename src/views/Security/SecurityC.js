import { connect } from 'react-redux';

import { accountActionCreators } from '../../store/account/accountActions';
import { authActionCreators } from '../../store/auth/authActions';
import Security from './Security';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onLogOut: authActionCreators.logOutPressed,
  onLogOutFromAllDevices: authActionCreators.logOutFromAllDevicesPressed,
  onDelete: accountActionCreators.deletePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Security);
