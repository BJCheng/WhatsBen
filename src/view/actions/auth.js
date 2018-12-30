import { SET_AUTH } from './types';

export const setAuth = (auth) => ({
  type: SET_AUTH,
  auth
});