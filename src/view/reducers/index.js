import { combineReducers } from 'redux';
import recipientHeader from './recipientHeader';
import messageBody from './messageBody';
import inputFooter from './inputFooter';

export default combineReducers({
  recipientHeader,
  messageBody,
  inputFooter
});