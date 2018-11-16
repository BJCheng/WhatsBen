import { CHANGE_INPUT, APPEND_MESSAGE, CLEAR_INPUT } from './types';
import axios from 'axios';

export const changeInput = (text) => ({
  type: CHANGE_INPUT,
  value: text
});

export const appendMessageToList = (text) => ({
  type: APPEND_MESSAGE,
  value: text
});

export const sendMessageAsync = (text) => () => {
  return axios.post(`${global.__apiUrl__}/send-message`, { msg: text });
};

export const clearInput = () => ({
  type: CLEAR_INPUT
});