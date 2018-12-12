import { CHAT_READY } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case CHAT_READY:
      return action.value;
    default:
      return state;
  }
};