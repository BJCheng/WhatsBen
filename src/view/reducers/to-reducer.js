import { SET_TO_USER } from '../actions/types';

const toInitialState = {
  name: '',
  lastSeen: Date.now()
};

export default (state, action) => {
  switch (action.type) {
    case SET_TO_USER:
      return { ...state, id: action.id, name: action.name, lastSeen: action.lastSeen };
    default:
      return toInitialState;
  }
};