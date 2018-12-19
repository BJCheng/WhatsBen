import {LOGIN } from '../actions/types';

export default (state = true, action) => {
  switch (action.type) {
    case LOGIN:
      return true;
    default:
      return state;
  }
};