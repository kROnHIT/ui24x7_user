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
  GET_STATE,
  GET_STATE_SUCCESS,
  GET_STATE_ERROR,
  GET_CITY,
  GET_CITY_SUCCESS,
  GET_CITY_ERROR,
  SET_CITY,
  SET_CITY_SUCCESS,
  SET_CITY_ERROR,
  ENQUIRY,
  ENQUIRY_SUCCESS,
  ENQUIRY_ERROR,
  CHECK_SET_CITY,
  CHECK_SET_CITY_SUCCESS,
  CHECK_SET_CITY_ERROR,
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
export const getState = (data) => ({
  type: GET_STATE,
  payload: data
});
export const getStateSuccess = (items) => ({
  type: GET_STATE_SUCCESS,
  payload: items
});
export const getStateError = (message) => ({
  type: GET_STATE_ERROR,
  payload: message
});
export const getCity = (data) => ({
  type: GET_CITY,
  payload: data
});
export const getCitySuccess = (items) => ({
  type: GET_CITY_SUCCESS,
  payload: items
});
export const getCityError = (message) => ({
  type: GET_CITY_ERROR,
  payload: message
});
export const setCity = (data) => ({
  type: SET_CITY,
  payload: data
});
export const setCitySuccess = (items) => ({
  type: SET_CITY_SUCCESS,
  payload: items
});
export const setCityError = (message) => ({
  type: SET_CITY_ERROR,
  payload: message
});
export const enquiry = (data) => ({
  type: ENQUIRY,
  payload: data
});
export const enquirySuccess = (items) => ({
  type: ENQUIRY_SUCCESS,
  payload: items
});
export const enquiryError = (message) => ({
  type: ENQUIRY_ERROR,
  payload: message
});
export const chechSetCity = (data) => ({
  type: CHECK_SET_CITY,
  payload: data
});
export const chechSetCitySuccess = (items) => ({
  type: CHECK_SET_CITY_SUCCESS,
  payload: items
});
export const chechSetCityError = (message) => ({
  type: CHECK_SET_CITY_ERROR,
  payload: message
});