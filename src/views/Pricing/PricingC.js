import { connect } from 'react-redux';

import { authSelectors } from '../../store/auth/authSelectors';
import Pricing from './Pricing';

const mapStateToProps = state => ({ isLoggedIn: authSelectors.isLoggedIn(state) });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
