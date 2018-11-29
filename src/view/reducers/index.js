import { combineReducers } from 'redux';
import headerReducer from './header-reducer';
import bodyReducer from './body-reducer';
import footerReducer from './footer-reducer';
import fromReducer from './from-reducer';
import toReducer from './to-reducer';

export default combineReducers({
  header: headerReducer,
  body: bodyReducer,
  footer: footerReducer,
  from: fromReducer,
  to: toReducer
});