import {
    ADD_COMPLAIN,
    ADD_COMPLAIN_SUCCESS,
    ADD_COMPLAIN_ERROR,
    FETCH_COMPLAIN,
    FETCH_COMPLAIN_SUCCESS,
    FETCH_COMPLAIN_ERROR,
  } from '../actions';
  
  export const addComplain = (data) => ({
    type: ADD_COMPLAIN,
    payload: data
  });
  export const addComplainSuccess = (items) => ({
    type: ADD_COMPLAIN_SUCCESS,
    payload: items
  });
  export const addComplainError = (message) => ({
    type: ADD_COMPLAIN_ERROR,
    payload: message
  });
  export const fetchComplain = (data) => ({
    type: FETCH_COMPLAIN,
    payload: data
  });
  export const fetchComplainSuccess = (items) => ({
    type: FETCH_COMPLAIN_SUCCESS,
    payload: items
  });
  export const fetchComplainError = (message) => ({
    type: FETCH_COMPLAIN_ERROR,
    payload: message
  });