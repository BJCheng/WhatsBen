import { RENDER_MODAL, HIDE_MODAL } from '../actions/types';

const initialState = {
  render: false,
  message: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RENDER_MODAL:
      return { ...state, render: true, message: action.message };
    case HIDE_MODAL:
      return { ...state, render: false };
    default:
      return state;
  }
};