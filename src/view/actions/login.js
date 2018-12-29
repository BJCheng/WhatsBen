import {
  ON_ID_CHANGE, ON_PASSWORD_CHANGE,
  SWITCH_TO_SIGN_IN, SWITCH_TO_CREATE_ACCOUNT
} from '../actions/types';
import api from '../actions/api';

export const onPasswordChange = (value) => ({
  type: ON_PASSWORD_CHANGE,
  value
});

export const onIdChange = (value) => ({
  type: ON_ID_CHANGE,
  value
});

export const createUser = () => async (dispatch, getState) => {
  const state = getState();
  const { id, password } = state.login;
  const result = await api.post(`/user/${id}`, { password });
  // dispatch action to screnn only has contacts but not chat
  // chat will be render only after click on a contact
};

export const switchToSignIn = () => ({
  type: SWITCH_TO_SIGN_IN
});

export const switchToCreateAccount = () => ({
  type: SWITCH_TO_CREATE_ACCOUNT
});