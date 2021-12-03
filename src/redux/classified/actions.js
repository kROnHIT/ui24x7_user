import {
    FETCH_EMERGENCY,
    FETCH_EMERGENCY_SUCCESS,
    FETCH_EMERGENCY_ERROR,
  } from '../actions';
  
  export const fetchEmergency = (data) => ({
    type: FETCH_EMERGENCY,
    payload: data
  });
  export const fetchEmergencySuccess = (items) => ({
    type: FETCH_EMERGENCY_SUCCESS,
    payload: items
  });
  export const fetchEmergencyError = (message) => ({
    type: FETCH_EMERGENCY_ERROR,
    payload: message
  });