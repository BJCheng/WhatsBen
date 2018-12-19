import {
  CHANGE_INPUT, APPEND_MESSAGE, CLEAR_INPUT, REDIRECT_TO_LOGIN,
  FETCH_TO_USER, SET_FROM_USER, RENDER_MODAL, MODAL_CHANGE_NAME,
  CHAT_READY, RECEIVE_MESSAGES, UPDATE_MESSAGE, RECEIVE_MESSAGE,
  CLOSE_MODAL, SET_TO_ID, HIDE_MODAL, FROM_READY, UPDATE_CONTACT,
  FETCH_CONTACTS, CONTACTS_READY
} from './types';
import api from './api';
import setupSocket from '../utils/setup-socket';
import LocalStorage from '../utils/local-storage';

export const changeInput = (text) => ({
  type: CHANGE_INPUT,
  value: text
});

export const appendMessage = (messageObj) => ({
  type: APPEND_MESSAGE,
  messageObj
});

const updateMessage = (messageObj) => ({
  type: UPDATE_MESSAGE,
  messageObj
});

export const clearInput = () => ({
  type: CLEAR_INPUT
});

export const redirectToLogin = () => ({
  type: REDIRECT_TO_LOGIN
});

export const setFromUser = fromUserObj => dispatch => {
  const { id } = fromUserObj;
  setupSocket(id, dispatch);
  dispatch({
    type: SET_FROM_USER,
    fromUserObj
  });
  dispatch({
    type: FROM_READY
  });
};

export const renderModalWithMsg = message => ({
  type: RENDER_MODAL,
  message
});

export const chatReady = () => ({
  type: CHAT_READY
});

export const receiveMessage = (messageObj) => ({
  type: RECEIVE_MESSAGE,
  messageObj
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const modalChangeName = (name) => ({
  type: MODAL_CHANGE_NAME,
  name
});

export const setToId = (id) => ({
  type: SET_TO_ID,
  id
});

export const hideModal = () => ({
  type: HIDE_MODAL
});

export const sendMessage = ({ from, to, text, sendTime }) => async (dispatch) => {
  const returnedMessage = await api.post(`/message/${from}/${to}`, { text, sendTime });
  // TODO: dispatch action to render picture of server received
  // TODO: handle if returnedMessage contains errors
  const data = JSON.parse(returnedMessage.data.data);
  dispatch(updateMessage(data));
};

export const fetchToUser = () => async (dispatch, getState) => {
  const id = getState().to.id;
  const response = await api.get(`/user/${id}`);
  const data = response.data;
  if (data.error || data.error.length > 0) {
    // TODO: redirect to login page and display error message
    dispatch(renderModalWithMsg('The user you are trying to make contact with is not exist.'));
    return;
  }

  dispatch({
    type: FETCH_TO_USER,
    toUserObj: data.data
  });
  dispatch(chatReady());
};

export const fetchMessagesBetween = (from, to) => async dispatch => {
  const response = await api.get(`/messages/${from}/${to}`);
  if (!response.data || response.data.error)
    return;
  dispatch({
    type: RECEIVE_MESSAGES,
    messages: response.data.data
  });
};

export const modalSubmit = () => async (dispatch, getState) => {
  const result = await api.post('/namespace');
  if (result.data.error && result.data.error.length > 0) {
    console.error('setup socket faild');
    return;
  }
  const fromUserObj = {
    id: result.data.data.id,
    name: getState().modal.name
  };
  LocalStorage.setObj('from', fromUserObj);
  setupSocket(result.data.data.id);
  dispatch(setFromUser(fromUserObj));
  dispatch(fetchToUser());
  dispatch(hideModal());
};

export const updateContact = (id) => ({
  type: UPDATE_CONTACT,
  id
});

export const fetchContacts = () => async (dispatch, getState) => {
  const contacts = await api.get(`/contacts/${getState().from.id}`);
  dispatch({
    type: FETCH_CONTACTS,
    contacts: contacts.data
  });
  dispatch({
    type: CONTACTS_READY
  });
};