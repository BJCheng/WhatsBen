import { combineReducers } from 'redux';
import headerReducer from './header-reducer';
import bodyReducer from './body-reducer';
import footerReducer from './footer-reducer';
import namespaceReducer from './namespace-reducer';

export default combineReducers({
  header: headerReducer,
  body: bodyReducer,
  footer: footerReducer,
  namespace: namespaceReducer
});