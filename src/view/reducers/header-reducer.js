import { FETCH_TO_USER, SET_TO_USER } from '../actions/types';

const headerInitialState = {
  id: '',
  name: '',
  thumbnailUrl: '',
  lastSeen: ''
};
export default (state = headerInitialState, action) => {
  switch (action.type) {
    case FETCH_TO_USER:
    case SET_TO_USER:
      return { ...state, ...action.toUserObj };
    default:
      return state;
  }
};