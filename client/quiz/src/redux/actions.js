
import { LOGIN_SUCCESS } from './actionTypes';

export const loginSuccess = (userId) => ({
  type: LOGIN_SUCCESS,
  payload: userId,
});
