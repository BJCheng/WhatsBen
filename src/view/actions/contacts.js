import { FETCH_CONTACTS, CONTACTS_READY } from './types';
import { api } from './api';

export const fetchContacts = (fromId) => async (dispatch) => {
  const contacts = await api.get(`/contacts/${fromId}`);
  dispatch({
    type: FETCH_CONTACTS,
    contacts: contacts.data
  });
  dispatch(contactsReady());
};

export const contactsReady = () => ({
  type: CONTACTS_READY
});