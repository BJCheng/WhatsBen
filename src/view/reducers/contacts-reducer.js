import { FETCH_CONTACTS, UPDATE_CONTACT } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return action.contacts;
    case UPDATE_CONTACT:
      const incomingExistingContact = state.find(contact => contact.id === action.contact.id);
      if (incomingExistingContact) {
        return [incomingExistingContact].concat(state.filter(contact => contact.id !== action.contact.id));
      } else {
        return [action.contact].concat(state);
      }
    default:
      return state;
  }
};