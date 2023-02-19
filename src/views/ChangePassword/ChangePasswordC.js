import { connect } from 'react-redux';

import { accountActionCreators } from '../../store/account/accountActions';
import { accountSelectors } from '../../store/account/accountSelectors';
import ChangePassword from './ChangePassword';

const mapStateToProps = state => ({
  telegramId: accountSelectors.getAccount(state).telegramId,
  isLoading: accountSelectors.isLoading(state),
});

const mapDispatchToProps = {
  onChange: accountActionCreators.changePasswordPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
