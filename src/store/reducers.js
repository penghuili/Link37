import { combineReducers } from 'redux';
import { accountReducer } from './account/accountReducer';

import { appReducer } from './app/appReducer';
import { authReducer } from './auth/authReducer';
import { linksReducer } from './links/linksReducer';

export const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  account: accountReducer,
  links: linksReducer,
});
