import { combineReducers } from 'redux';
import headerReducer from './header-reducer';
import bodyReducer from './body-reducer';
import footerReducer from './footer-reducer';

export default combineReducers({
  header: headerReducer,
  body: bodyReducer,
  footer: footerReducer
});