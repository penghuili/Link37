import { connect } from 'react-redux';

import { authSelectors } from '../store/auth/authSelectors';
import Router from './Router';

const mapStateToProps = state => ({
  isCheckingRefreshToken: authSelectors.isCheckingRefreshToken(state),
  isLoggedIn: authSelectors.isLoggedIn(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
