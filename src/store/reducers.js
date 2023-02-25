import { combineReducers } from 'redux';

import { sharedReducer } from '../shared/react/store/sharedReducer';
import { linksReducer } from './links/linksReducer';

export const reducers = combineReducers({
  links: linksReducer,
  shared: sharedReducer,
});
