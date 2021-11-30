import {
    ADD_MESSAGE_TO_GUARD,
    ADD_MESSAGE_TO_GUARD_SUCCESS,
    ADD_MESSAGE_TO_GUARD_ERROR,

    ADD_FUTURE_ENTRY,
    ADD_FUTURE_ENTRY_SUCCESS,
    ADD_FUTURE_ENTRY_ERROR,
  } from '../actions';
  
  export const addMessageToGuard = (data) => ({
    type: ADD_MESSAGE_TO_GUARD,
    payload: data
  });
  export const addMessageToGuardSuccess = (items) => ({
    type: ADD_MESSAGE_TO_GUARD_SUCCESS,
    payload: items
  });
  export const addMessageToGuardError = (message) => ({
    type: ADD_MESSAGE_TO_GUARD_ERROR,
    payload: message
  });

  export const addFutureEntry = (data) => ({
    type: ADD_FUTURE_ENTRY,
    payload: data
  });
  export const addFutureEntrySuccess = (items) => ({
    type: ADD_FUTURE_ENTRY_SUCCESS,
    payload: items
  });
  export const addFutureEntryError = (message) => ({
    type: ADD_FUTURE_ENTRY_ERROR,
    payload: message
  });