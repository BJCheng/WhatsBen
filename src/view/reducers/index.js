import { combineReducers } from 'redux';
import recipient from './recipient';
import bodyReducer from './body-reducer';
import input from './input';

export default combineReducers({
  recipient,
  body: bodyReducer,
  input
});