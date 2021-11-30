import {
  CHECK_USER,
  CHECK_USER_SUCCESS,
  CHECK_USER_ERROR,
  LOGIN_WITH_PASSWORD,
  LOGIN_WITH_PASSWORD_SUCCESS,
  LOGIN_WITH_PASSWORD_ERROR,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from '../actions';

export const checkUser = (data) => ({
  type: CHECK_USER,
  payload: data
});
export const checkUserSuccess = (items) => ({
  type: CHECK_USER_SUCCESS,
  payload: items
});
export const checkUserError = (message) => ({
  type: CHECK_USER_ERROR,
  payload: message
});
export const loginWithPassword = (data) => ({
  type: LOGIN_WITH_PASSWORD,
  payload: { data }
});
export const loginWithPasswordSuccess = (items) => ({
  type: LOGIN_WITH_PASSWORD_SUCCESS,
  payload: items
});
export const loginWithPasswordError = (message) => ({
  type: LOGIN_WITH_PASSWORD_ERROR,
  payload: message
});

export const logoutUser = (navigation) => ({
  type: LOGOUT_USER,
  payload: { navigation }
});
export const registerUser = (data) => ({
  type: REGISTER_USER,
  payload: data
});
export const registerUserSuccess = (items) => ({
  type: REGISTER_USER_SUCCESS,
  payload: items
});
export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: message
});