import {
  RENDER_MODAL, CLOSE_MODAL, MODAL_CHANGE_NAME,
  HIDE_MODAL
} from '../actions/types';

const initialState = {
  render: false,
  message: '',
  name: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RENDER_MODAL:
      return { ...state, render: true, message: action.message };
    case CLOSE_MODAL:
      return { ...state, render: false };
    case MODAL_CHANGE_NAME:
      return { ...state, name: action.name };
    case HIDE_MODAL:
      return { ...state, render: false };
    default:
      return state;
  }
};