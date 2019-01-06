import { HAD_SETUP_CLIENT_SOCKET } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case HAD_SETUP_CLIENT_SOCKET:
      return true;
    default:
      return state;
  }
};