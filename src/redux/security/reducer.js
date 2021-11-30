import {
    ADD_SECURITY,
    ADD_SECURITY_SUCCESS,
    ADD_SECURITY_ERROR,
  } from '../actions';
  
  const INIT_STATE = {
    loading: false,
    error: '',
    message: '',
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case ADD_SECURITY:
        return { ...state, loading: true };
      case ADD_SECURITY_SUCCESS:
        return { ...state, loading: false, ...action.payload };
      case ADD_SECURITY_ERROR:
        return { ...state, loading: false, ...action.payload };
      default: return { ...state };
    }
  }
  