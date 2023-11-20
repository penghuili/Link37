import { connect } from 'react-redux';
import sharedSelectors from '../../shared/react/store/sharedSelectors';
import { PicoWrapper as PicoWrapperComponent } from './PicoWrapper';

const mapStateToProps = state => ({
  themeMode: sharedSelectors.getThemeMode(state),
});

const mapDispatchToProps = {};

export const PicoWrapper = connect(mapStateToProps, mapDispatchToProps)(PicoWrapperComponent);
