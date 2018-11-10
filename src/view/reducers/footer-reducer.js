import { CHANGE_INPUT, CLEAR_INPUT } from '../actions/types';

const inputFooterInitialState = {
  text: ''
};
export default (state = inputFooterInitialState, action) => {
  switch (action.type) {
    case 'CLICK':
      return state;
    case CHANGE_INPUT:
      return { ...state, text: action.value };
    case CLEAR_INPUT:
      return { ...state, text: '' };
    default:
      return state;
  }
};