import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';

import AppContainer from './components/AppContainer';
import { getHook, HooksOutsieWrapper, setHook } from './shared/react/hooksOutside';
import HTTP from './shared/react/HTTP';
import store from './store';
import { appActionCreators } from './store/app/appActions';

setHook('location', useLocation);
setHook('dispatch', useDispatch);

HTTP.setHandle401(() => {
  const dispatch = getHook('dispatch');
  dispatch(appActionCreators.reset());
});

function App() {
  return (
    <StoreProvider store={store}>
      <AppContainer />
      <HooksOutsieWrapper />
    </StoreProvider>
  );
}

export default App;
