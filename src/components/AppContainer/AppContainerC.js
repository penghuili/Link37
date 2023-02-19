import { connect } from 'react-redux';

import { appSelectors } from '../../store/app/appSelectors';
import AppContainer from './AppContainer';

const mapStateToProps = state => ({
  themeMode: appSelectors.getThemeMode(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
