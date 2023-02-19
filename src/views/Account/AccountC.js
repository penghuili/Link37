import { connect } from 'react-redux';

import { accountSelectors } from '../../store/account/accountSelectors';
import Account from './Account';

const mapStateToProps = state => ({
  account: accountSelectors.getAccount(state),
  isLoadingAccount: accountSelectors.isLoading(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
