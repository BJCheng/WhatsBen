import { RECEIVE_TO_USER } from '../actions/types';

const toInitialState = {id: '', name: '', lastSeen: ''};

export default (state = toInitialState, action) => {
  switch (action.type) {
    case RECEIVE_TO_USER:
      return { ...state, ...action.toUserObj };
    default:
      return state;
  }
};