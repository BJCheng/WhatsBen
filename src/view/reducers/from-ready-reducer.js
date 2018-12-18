import { FROM_READY } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case FROM_READY:
      return true;
    default:
      return state;
  }
};