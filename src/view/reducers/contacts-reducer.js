import { FETCH_CONTACTS, UPDATE_CONTACT } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return action.contacts;
    case UPDATE_CONTACT:
      return [action.id].concat(state.map(id => {
        if (id === action.id)
          return;
        else
          return id;
      }));
    default:
      return state;
  }
};