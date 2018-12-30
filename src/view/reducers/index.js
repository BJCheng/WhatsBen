import { combineReducers } from 'redux';
import headerReducer from './header-reducer';
import messagesReducer from './messages-reducer';
import footerReducer from './footer-reducer';
import fromReducer from './from-reducer';
import toReducer from './to-reducer';
import modalReducer from './modal-reducer';
import chatReadyReducer from './chat-ready-reducer';
import fromReadyReducer from './from-ready-reducer';
import contactsReadyReducer from './contacts-ready-reducer';
import contactsReducer from './contacts-reducer';
import registeredUserReducer from './registered-user-reducer';
import loginReducer from './login-reducer';
import authReducer from './auth-reducer';

export default combineReducers({
  header: headerReducer,
  messages: messagesReducer,
  footer: footerReducer,
  from: fromReducer,
  to: toReducer,
  modal: modalReducer,
  chatReady: chatReadyReducer,
  fromReady: fromReadyReducer,
  contactsReady: contactsReadyReducer,
  contacts: contactsReducer,
  registeredUser: registeredUserReducer,
  login: loginReducer,
  auth: authReducer
});