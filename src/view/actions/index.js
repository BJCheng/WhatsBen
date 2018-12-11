import {
  CHANGE_INPUT, APPEND_MESSAGE, CLEAR_INPUT, REDIRECT_TO_LOGIN,
  RECEIVE_TO_USER, SET_FROM_USER, RENDER_MODAL, HIDE_MODAL
} from './types';
import { getUserById, getMessgeasBetween } from './apis';
import LocalStorage from '../utils/local-storage';
import axios from 'axios';

const apiUrl = global.__apiUrl__;

export const changeInput = (text) => ({
  type: CHANGE_INPUT,
  value: text
});

export const appendMessageToList = (text) => ({
  type: APPEND_MESSAGE,
  value: text
});

export const sendMessageAsync = (text) => () => {
  return axios.post(`${apiUrl}/send-message`, { msg: text });
};

export const clearInput = () => ({
  type: CLEAR_INPUT
});

export const loadMessages = (dispatch, getState) => {
  return axios.get(`${apiUrl}`);
};

export const fetchToUser = (id) => async dispatch => {
  const response = await getUserById(id);
  const data = response.data;
  if (data.error || data.error.length > 0) {
    dispatch(renderModalWithMsg('The user you are trying to make contact with is not exist.'));
    return;
  }
  dispatch(receiveToUser(data.data));
};

const receiveToUser = (toUserObj) => ({
  type: RECEIVE_TO_USER,
  toUserObj
});

export const redirectToLogin = () => ({
  type: REDIRECT_TO_LOGIN
});

export const setFromUser = () => {
  const fromUserObj = LocalStorage.getObj('from');
  if (!fromUserObj) {
    return (renderModalWithMsg('It is your first time login, please tell us your preferrable way to be called.'));
  }
  return {
    type: SET_FROM_USER,
    fromUserObj
  };
};

export const renderModalWithMsg = (message) => ({
  type: RENDER_MODAL,
  message
});

export const hideModal = () => ({
  type: HIDE_MODAL
});