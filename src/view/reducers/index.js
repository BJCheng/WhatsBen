import { combineReducers } from 'redux';
import recipient from './recipient';
import messageList from './message-list';
import input from './input';

export default combineReducers({
  recipient,
  messageList,
  input
});