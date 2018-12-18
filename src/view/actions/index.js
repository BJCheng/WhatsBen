import {
  CHANGE_INPUT, APPEND_MESSAGE, CLEAR_INPUT, REDIRECT_TO_LOGIN,
  RECEIVE_TO_USER, SET_FROM_USER, RENDER_MODAL, MODAL_CHANGE_NAME,
  CHAT_READY, RECEIVE_MESSAGES, UPDATE_MESSAGE, RECEIVE_MESSAGE,
  CLOSE_MODAL, SET_TO_ID, HIDE_MODAL
} from './types';
import apis from './apis';
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
  const returnedMessage = await apis.sendMessages(from, to, text, sendTime);
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

export const fetchToUser = () => async (dispatch, getState) => {
  const id = getState().to.id;
  const response = await apis.getUserById(id);
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

export const fetchMessagesBetween = (from, to) => async (dispatch, getState) => {
  const messages = await apis.fetchMessgeasBetween(from, to);
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

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const modalChangeName = (name) => ({
  type: MODAL_CHANGE_NAME,
  name
});

export const modalSubmit = () => async (dispatch, getState) => {
  const result = await apis.setupNamespace();
  if (result.data.error && result.data.error.length > 0) {
    console.error('setup socket faild');
    return;
  }
  const fromUserObj = {
    id: result.data.data.id,
    name: getState().modal.name
  };
  setupSocket(result.data.data.id);
  dispatch(setFromUser(fromUserObj));
  // dispatch(fromReady());
  dispatch(fetchToUser());
  dispatch(hideModal());
};

export const setToId = (id) => ({
  type: SET_TO_ID,
  id
});

export const hideModal = () => ({
  type: HIDE_MODAL
});