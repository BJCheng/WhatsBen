import { RECEIVE_TO_USER } from '../actions/types';

const toInitialState = {
  name: '',
  lastSeen: Date.now()
};

export default (state = toInitialState, action) => {
  switch (action.type) {
    case RECEIVE_TO_USER:
      return { ...state, ...action.toUserObj };
    default:
      return state;
  }
};