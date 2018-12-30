import { SET_AUTH } from '../actions/types';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, ...action.auth };
    default:
      return state;
  }
};