import { connect } from 'react-redux';
import { authActionCreators } from '../../store/auth/authActions';
import { authSelectors } from '../../store/auth/authSelectors';

import SignIn from './SignIn';

const mapStateToProps = state => ({
  errorMessage: authSelectors.getErrorMessage(state),
  isLoading: authSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onSignIn: authActionCreators.signInPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
