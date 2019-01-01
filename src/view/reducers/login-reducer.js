import {
  ON_ID_CHANGE, ON_PASSWORD_CHANGE, SWITCH_TO_SIGN_IN,
  SWITCH_TO_CREATE_ACCOUNT, LOGIN_READY
} from '../actions/types';

const initialState = { id: '', password: '', isCreateAccount: false, ready: false };
export default (state = initialState, action) => {
  switch (action.type) {
    case ON_ID_CHANGE:
      return { ...state, id: action.value };
    case ON_PASSWORD_CHANGE:
      return { ...state, password: action.value };
    case SWITCH_TO_SIGN_IN:
      return { ...state, isCreateAccount: false };
    case SWITCH_TO_CREATE_ACCOUNT:
      return { ...state, isCreateAccount: true };
    case LOGIN_READY:
      return { ...state, ready: action.ready };
    default:
      return state;
  }
};