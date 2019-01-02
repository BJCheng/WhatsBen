import { FETCH_CONTACTS, UPDATE_CONTACT } from '../actions/types';

export default (state = [], action) => {
  const incomingContact = state.find(contact => contact.id === action.id);
  switch (action.type) {
    case FETCH_CONTACTS:
      return action.contacts;
    case UPDATE_CONTACT:
      return [incomingContact].concat(state.filter(contact => contact.id !== action.id).map(contact => {
        if (contact.id !== action.id)
          return contact;
      }));
    default:
      return state;
  }
};