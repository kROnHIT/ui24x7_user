import {
    ADD_SECURITY,
    ADD_SECURITY_SUCCESS,
    ADD_SECURITY_ERROR,
  } from '../actions';
  
  export const addSecurity = (data) => ({
    type: ADD_SECURITY,
    payload: { data }
  });
  export const addSecuritySuccess = (items) => ({
    type: ADD_SECURITY_SUCCESS,
    payload: items
  });
  export const addSecurityError = (message) => ({
    type: ADD_SECURITY_ERROR,
    payload: message
  });