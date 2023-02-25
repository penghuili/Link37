import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import Router from './router';
import AppContainer from './shared/react/AppContainer';
import createTheme from './shared/react/AppContainer/createTheme';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import store from './store';

setHook('location', useLocation);
setHook('dispatch', useDispatch);

const theme = createTheme('#D2356E');

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer theme={theme}>
        <Router />
      </AppContainer>
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
