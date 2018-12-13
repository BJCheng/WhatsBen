import { combineReducers } from 'redux';
import headerReducer from './header-reducer';
import messagesReducer from './messages-reducer';
import footerReducer from './footer-reducer';
import fromReducer from './from-reducer';
import toReducer from './to-reducer';
import modalReducer from './modal-reducer';
import chatReadyReducer from './chat-ready-reducer';

export default combineReducers({
  header: headerReducer,
  messages: messagesReducer,
  footer: footerReducer,
  from: fromReducer,
  to: toReducer,
  modal: modalReducer,
  chatReady: chatReadyReducer
});