import { APPEND_MESSAGE } from '../actions/types';

const initialMessages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4'];
export default (messages = initialMessages, action) => {
  switch (action.type) {
    case APPEND_MESSAGE: {
      return [...messages.concat(action.value)];
    }
    default: {
      return messages;
    }
  }
};