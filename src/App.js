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
  logo: 'https://static.peng37.com/faviconapi/52190fe8-4549-4a16-b25b-3b42954128bc/6d4ddf3d5c22b6fc1819b4e9312ecae90b470d6556ac6b7243cd3ac658fb664e/icon-192.png',
  app: apps.link37.name,
  encryptionUrl: 'https://peng37.com/encryption/',
  privacyUrl: 'https://encrypt37.com/link37/privacy/',
  termsUrl: 'https://encrypt37.com/link37/terms/',
});

setHook('location', useLocation);
setHook('dispatch', useDispatch);

const theme = createTheme(apps.link37.color);

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
