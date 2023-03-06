import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import logo from './assets/logo.png';
import Pitch from './components/Pitch';
import Router from './router';
import apps from './shared/js/apps';
import AppContainer from './shared/react/AppContainer';
import createTheme from './shared/react/AppContainer/createTheme';
import ContentWrapper from './shared/react/ContentWrapper';
import Divider from './shared/react/Divider';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import initShared from './shared/react/initShared';
import Spacer from './shared/react/Spacer';
import store from './store';

initShared({ logo, app: apps.link37.name });

setHook('location', useLocation);
setHook('dispatch', useDispatch);

const theme = createTheme('#D2356E');

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer theme={theme}>
        <Router />

        <ContentWrapper as="footer">
          <Divider />
          <Spacer />
          <Pitch />
        </ContentWrapper>
      </AppContainer>
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
