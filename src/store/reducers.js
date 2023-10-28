import { combineReducers } from 'redux';
import { sharedReducer } from '../shared/react/store/sharedReducer';
import { groupDomain, groupReducer } from './group/groupStore';
import { linkDomain, linkReducer } from './link/linkStore';
import { pageDomain, pageReducer } from './page/pageStore';

export const reducers = combineReducers({
  shared: sharedReducer,
  [pageDomain]: pageReducer,
  [linkDomain]: linkReducer,
  [groupDomain]: groupReducer
});
