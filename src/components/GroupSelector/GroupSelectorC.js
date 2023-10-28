import { connect } from 'react-redux';
import { pageSelectors } from '../../store/page/pageStore';
import GroupSelector from './GroupSelector';

const mapStateToProps = state => ({
  page: pageSelectors.data.getStandaloneItem(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GroupSelector);
