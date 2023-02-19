import { connect } from 'react-redux';

import { appActionCreators } from '../../store/app/appActions';
import { appSelectors } from '../../store/app/appSelectors';
import Toast from './Toast';

const mapStateToProps = state => ({
  toast: appSelectors.getToast(state),
});

const mapDispatchToProps = {
  onClose: () => appActionCreators.setToast(''),
};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
