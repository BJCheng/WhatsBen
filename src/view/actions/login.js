import {
  ON_ID_CHANGE, ON_PASSWORD_CHANGE,
  SWITCH_TO_SIGN_IN, SWITCH_TO_CREATE_ACCOUNT
} from '../actions/types';
import { api, apiErrorHandler } from '../actions/api';
import { setAuth } from './auth';
import { setFromUser } from '.';
import LocalStorage from '../utils/local-storage';

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
  const result = await api.post(`/user/${id}`, { password }).catch(err => { console.error(JSON.stringify(err)); });
  dispatch(setAuth(result.data));
  dispatch(setFromUser(result.data));
  LocalStorage.setObj('auth', result.data);
  LocalStorage.setObj('from', result.data);
};

export const switchToSignIn = () => ({
  type: SWITCH_TO_SIGN_IN
});

export const switchToCreateAccount = () => ({
  type: SWITCH_TO_CREATE_ACCOUNT
});

export const signIn = async (dispatch, getState) => {
  const state = getState();
  const { id, password } = state.login;
  const result = await api.post('/auth').catch((err) => {
    //TODO
    dispatch(renderErrorMessage(err.message));
  });
  //TODO: goto contacts page by updating 'login' in local storage and 'from'
  dispatch();
};