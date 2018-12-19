import { CONTACTS_READY } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case CONTACTS_READY:
      return true;
    default:
      return state;
  }
};