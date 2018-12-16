import {
  CHANGE_INPUT, APPEND_MESSAGE, CLEAR_INPUT, REDIRECT_TO_LOGIN,
  RECEIVE_TO_USER, SET_FROM_USER, RENDER_MODAL, HIDE_MODAL,
  CHAT_READY, RECEIVE_MESSAGES, UPDATE_MESSAGE, RECEIVE_MESSAGE
} from './types';
import { getUserById, fetchMessgeasBetween, sendMessages } from './apis';
import LocalStorage from '../utils/local-storage';
import setupSocket from '../utils/setup-socket';

export const changeInput = (text) => ({
  type: CHANGE_INPUT,
  value: text
});

export const appendMessage = (messageObj) => ({
  type: APPEND_MESSAGE,
  messageObj
});

export const sendMessage = ({ from, to, text, sendTime }) => async (dispatch) => {
  const returnedMessage = await sendMessages(from, to, text, sendTime);
  // TODO: dispatch action to render picture of server received
  // TODO: handle if returnedMessage contains errors
  const data = JSON.parse(returnedMessage.data.data);
  dispatch(updateMessage(data));
};

const updateMessage = (messageObj) => ({
  type: UPDATE_MESSAGE,
  messageObj
});

export const clearInput = () => ({
  type: CLEAR_INPUT
});

export const fetchToUser = (id) => async dispatch => {
  const response = await getUserById(id);
  const data = response.data;
  if (data.error || data.error.length > 0) {
    // TODO: redirect to login page and display error message
    dispatch(renderModalWithMsg('The user you are trying to make contact with is not exist.'));
    return;
  }
  dispatch(receiveToUser(data.data));
  dispatch(chatReady());
};

const receiveToUser = (toUserObj) => ({
  type: RECEIVE_TO_USER,
  toUserObj
});

export const redirectToLogin = () => ({
  type: REDIRECT_TO_LOGIN
});

export const setFromUser = (fromUserObj) => (dispatch, getState) => {
  const { id } = fromUserObj;
  setupSocket(id, dispatch);
  dispatch({
    type: SET_FROM_USER,
    fromUserObj
  });
};

export const renderModalWithMsg = (message) => ({
  type: RENDER_MODAL,
  message
});

export const hideModal = () => ({
  type: HIDE_MODAL
});

export const fetchMessagesBetween = (from, to) => async (dispatch, getState) => {
  const messages = await fetchMessgeasBetween(from, to);
  if (!messages.data || messages.data.error)
    return;
  dispatch(receiveMessages(messages.data.data));
};

export const chatReady = () => ({
  type: CHAT_READY
});

export const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessage = (messageObj) => ({
  type: RECEIVE_MESSAGE,
  messageObj
});