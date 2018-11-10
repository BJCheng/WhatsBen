import { SEND_MESSAGE } from '../actions/types';

const messageBodyInitialState = {
  messages: []
};
export default (state = messageBodyInitialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const newMessages = [...state.messages];
      newMessages.push(action.value);
      return { ...state, newMessages };
    }
    default:
      return state;
  }
};