import { CHANGE_INPUT, SEND_MESSAGE, CLEAR_INPUT } from './types';

export const changeInput = (text) => ({
  type: CHANGE_INPUT,
  value: text
});

export const sendMessage = (text) => ({
  type: SEND_MESSAGE,
  value: text
});

export const clearInput = () => ({
  type: CLEAR_INPUT
});