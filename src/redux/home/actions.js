import {
    FETCH_NOTICE_ALL,
    FETCH_NOTICE_ALL_SUCCESS,
    FETCH_NOTICE_ALL_ERROR,
  } from '../actions';
  
  export const fetchNoticeAll = (data) => ({
    type: FETCH_NOTICE_ALL,
    payload: data
  });
  export const fetchNoticeAllSuccess = (items) => ({
    type: FETCH_NOTICE_ALL_SUCCESS,
    payload: items
  });
  export const fetchNoticeAllError = (message) => ({
    type: FETCH_NOTICE_ALL_ERROR,
    payload: message
  });