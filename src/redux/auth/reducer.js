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
  POP_UP,
  POP_UP_SUCCESS,
  POP_UP_ERROR,
} from '../actions';

const INIT_STATE = {
  user: null,
  loading: false,
  error: '',
  message: '',
  success: true,
  userExit: null,
  popup:false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHECK_USER:
      return { ...state, loading: true };
    case CHECK_USER_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case CHECK_USER_ERROR:
      return { ...state, loading: false, ...action.payload };
    case LOGIN_WITH_PASSWORD:
      return { ...state, loading: true };
    case LOGIN_WITH_PASSWORD_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case LOGIN_WITH_PASSWORD_ERROR:
      return { ...state, loading: false, ...action.payload };
    case LOGOUT_USER:
      return { ...state, user: null, error: '' };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case REGISTER_USER_ERROR:
      return { ...state, loading: false, ...action.payload };
    default: return { ...state };
  }
}