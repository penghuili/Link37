import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import Security from './Security';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onLogOut: sharedActionCreators.logOutPressed,
  onLogOutFromAllDevices: sharedActionCreators.logOutFromAllDevicesPressed,
  onDelete: sharedActionCreators.deleteAccountPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Security);
