import React from 'react';

import logo from '../assets/logo.png';
import BaseAppBar from '../shared/react/AppBar';

function AppBar({ isLoading }) {
  return <BaseAppBar logo={logo} isLoading={isLoading} />;
}

export default AppBar;
