import { SEND_MESSAGE } from '../actions/types';

const messageBodyInitialState = {
  messages: []
};
export default (state = messageBodyInitialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      return { ...state, messages: state.messages.concat(action.value) };
    }
    default:
      return state;
  }
};