import { connect } from 'react-redux';

import { sharedActionCreators } from '../../shared/react/store/sharedActions';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import ExpiredBanner from './ExpiredBanner';

const mapStateToProps = state => ({
  isExpired: !!sharedSelectors.tried(state) && !sharedSelectors.isAccountValid(state),
});

const mapDispatchToProps = {
  onNav: sharedActionCreators.navigate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredBanner);
