import { connect } from 'react-redux';
import { authActionCreators } from '../../store/auth/authActions';
import { authSelectors } from '../../store/auth/authSelectors';

import SignUp from './SignUp';

const mapStateToProps = state => ({
  errorMessage: authSelectors.getErrorMessage(state),
  isLoading: authSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onSignUp: authActionCreators.signUpPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
