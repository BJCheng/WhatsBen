import { APPEND_MESSAGE, RECEIVE_MESSAGES } from '../actions/types';

const initialMessages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4'];
export default (messages = initialMessages, action) => {
  switch (action.type) {
    case APPEND_MESSAGE: {
      return [...messages.concat(action.value)];
    }
    case RECEIVE_MESSAGES: {
      // parse json string to objects
      return [...action.messages.map(msg => JSON.parse(msg))];
    }
    default: {
      return messages;
    }
  }
};