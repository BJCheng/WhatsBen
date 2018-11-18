import { SET_NAME } from '../actions/types';

// TODO
const cookie = cookieUtil.get();

const namespaceInitialState = {
  name: cookie.getName(),
  lastSeen: Date.now()
};

export default (state = namespaceInitialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.value, lastSeen: Date.now() };
    default:
      return state;
  }
};