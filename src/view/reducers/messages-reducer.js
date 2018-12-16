import {
  APPEND_MESSAGE, RECEIVE_MESSAGES, UPDATE_MESSAGE,
  RECEIVE_MESSAGE
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case APPEND_MESSAGE: {
      return state.concat(action.messageObj);
    }
    case RECEIVE_MESSAGES: {
      // parse json string to objects
      return [...action.messages.map(msg => JSON.parse(msg))];
    }
    case UPDATE_MESSAGE: {
      // TODO: refacto, 太醜了
      const newMessageObj = action.messageObj;
      const newState = [...state];
      newState.forEach(msg => {
        if (msg.sendTime === newMessageObj.sendTime) {
          msg.serverReceiveTime = newMessageObj.serverReceiveTime;
          return;
        }
      });
      return newState;
    }
    case RECEIVE_MESSAGE: {
      return state.concat(action.messageObj);
    }
    default: {
      return state;
    }
  }
};