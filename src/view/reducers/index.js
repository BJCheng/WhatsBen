import { combineReducers } from 'redux';
import recipient from './recipient';
import bodyReducer from './body-reducer';
import footerReducer from './footer-reducer';

export default combineReducers({
  recipient,
  body: bodyReducer,
  footer: footerReducer
});