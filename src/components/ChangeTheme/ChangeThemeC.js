import { connect } from 'react-redux';

import { appActionCreators } from '../../store/app/appActions';
import { appSelectors } from '../../store/app/appSelectors';
import ChangeTheme from './ChangeTheme';

const mapStateToProps = state => ({
  themeMode: appSelectors.getThemeMode(state),
});

const mapDispatchToProps = {
  onChangeTheme: appActionCreators.changeThemeModePressed,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTheme);
