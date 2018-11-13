import { SEND_MESSAGE } from '../actions/types';

const messageBodyInitialState = {
  messages: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','1', '2','3','4']
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