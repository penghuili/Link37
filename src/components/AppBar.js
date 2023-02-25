import React from 'react';

import logo from '../assets/logo.png';
import BaseAppBar from '../shared/react/AppBar';

function AppBar({ isLoading, hasBack }) {
  return <BaseAppBar logo={logo} isLoading={isLoading} hasBack={hasBack} />;
}

export default AppBar;
