import {
  ON_ID_CHANGE, ON_PASSWORD_CHANGE,
  SWITCH_TO_SIGN_IN, SWITCH_TO_CREATE_ACCOUNT
} from '../actions/types';
import { api, apiErrorHandler } from '../actions/api';

export const onPasswordChange = (value) => ({
  type: ON_PASSWORD_CHANGE,
  value
});

export const onIdChange = (value) => ({
  type: ON_ID_CHANGE,
  value
});

export const createUser = async (dispatch, getState) => {
  const state = getState();
  const { id, password } = state.login;
  const result = await api.post(`/user/${id}`).catch(err => {
    console.error(JSON.stringify(err));
  });
  // dispatch action to screen only has contacts but not chat
  // chat will be render only after click on a contact
};

export const switchToSignIn = () => ({
  type: SWITCH_TO_SIGN_IN
});

export const switchToCreateAccount = () => ({
  type: SWITCH_TO_CREATE_ACCOUNT
});

export const signIn = async (dispatch, getState) => {
  const state = getState();
  const { id, password } = state.signIn;
  const result = await api.post('/auth').catch((err) => {
    //TODO
    dispatch(renderErrorMessage(err.message));
  });
  //TODO: goto contacts page
  dispatch();
};