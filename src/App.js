import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';
import Router from './router';
import { apps } from './shared/js/apps';
import createTheme from './shared/react-pure/createTheme';
import AppContainer from './shared/react/AppContainer';
import Toast from './shared/react/Toast';
import { HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import initShared from './shared/react/initShared';
import store from './store';

initShared({
  logo: `${process.env.REACT_APP_ASSETS_FOR_CODE}/link37-logo-231017.png`,
  app: apps.link37.name,
  privacyUrl: 'https://encrypt37.com/link37/privacy/',
  termsUrl: 'https://encrypt37.com/link37/terms/',
});

setHook('location', useLocation);
setHook('dispatch', useDispatch);

const theme = createTheme('#D2356E');

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer theme={theme}>
        <Router />

        <Toast />
      </AppContainer>
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
