import {
  CHANGE_INPUT, APPEND_MESSAGE, CLEAR_INPUT, REDIRECT_TO_LOGIN, SET_TO_USER,
  RECEIVE_TO_USER, SET_FROM_USER
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
    // dispatch(userNotExist());
    return;
  }
  dispatch(receiveToUser(data.data));
};

const receiveToUser = (toUserObj) => ({
  type: SET_TO_USER,
  toUserObj
});

export const redirectToLogin = () => ({
  type: REDIRECT_TO_LOGIN
});

export const setFromUser = () => {
  const fromUserObj = LocalStorage.getObj('from');
  return {
    type: SET_FROM_USER,
    fromUserObj
  };
};