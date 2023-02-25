import React from 'react';

import logo from '../assets/logo.png';
import BaseAppBar from '../shared/react/AppBar';

function AppBar({ title, isLoading, hasBack }) {
  return <BaseAppBar title={title} logo={logo} isLoading={isLoading} hasBack={hasBack} />;
}

export default AppBar;
