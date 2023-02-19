import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import AppContainer from './components/AppContainer';
import { HooksOutsieWrapper, setHook } from './lib/hooksOutside';
import store from './store';

setHook('location', useLocation);
setHook('dispatch', useDispatch);

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer />
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
