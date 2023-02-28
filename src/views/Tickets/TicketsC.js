import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import Tickets from './Tickets';

const mapStateToProps = state => ({
  payError: sharedSelectors.getPayError(state),
  isLoading: sharedSelectors.isLoadingSettings(state),
});

const mapDispatchToProps = {
  onPay: sharedActionCreators.payPressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
