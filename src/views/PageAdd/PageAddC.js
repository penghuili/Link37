import { connect } from 'react-redux';
import { pageActions, pageSelectors } from '../../store/page/pageStore';
import PageAdd from './PageAdd';

const mapStateToProps = state => ({
  isCreating: pageSelectors.createItem.isPending(state),
});

const mapDispatchToProps = {
  onCreate: pageActions.createRequested,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageAdd);
