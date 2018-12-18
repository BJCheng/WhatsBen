import { RECEIVE_TO_USER, SET_TO_ID } from '../actions/types';

const toInitialState = { id: '', name: '', lastSeen: '' };

export default (state = toInitialState, action) => {
  switch (action.type) {
    case RECEIVE_TO_USER:
      return { ...state, ...action.toUserObj };
    case SET_TO_ID:
      return {...state, id: action.id};
    default:
      return state;
  }
};