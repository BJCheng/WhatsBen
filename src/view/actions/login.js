import {
  ON_ID_CHANGE, ON_PASSWORD_CHANGE,
  SWITCH_TO_SIGN_IN, SWITCH_TO_CREATE_ACCOUNT
} from '../actions/types';
import { api, apiErrorHandler } from '../actions/api';
import { setAuth } from './auth';
import { setFromUser } from '.';
import LocalStorage from '../utils/local-storage';
import setupSocket from '../utils/setup-socket';

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
  setupSocket(id, dispatch);
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
  const result = await api.post('/auth', { id, password }).catch((err) => {
    //TODO
    dispatch(renderErrorMessage(err.message));
  });
  dispatch(setAuth(result.data));
  dispatch(setFromUser(result.data));
  LocalStorage.setObj('auth', result.data);
  LocalStorage.setObj('from', result.data);
  setupSocket(id, dispatch);
};