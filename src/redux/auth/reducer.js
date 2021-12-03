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
  ENQUIRY,
  ENQUIRY_SUCCESS,
  ENQUIRY_ERROR,
} from '../actions';

const INIT_STATE = {
  user: null,
  loading: false,
  error: '',
  message: '',
  success: true,
  userExit: null,
  state: [],
  city: [],
  setCity: [],
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
    case GET_STATE:
      return { ...state, loading: true };
    case GET_STATE_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case GET_STATE_ERROR:
      return { ...state, loading: false, ...action.payload };
    case GET_CITY:
      return { ...state, loading: true };
    case GET_CITY_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case GET_CITY_ERROR:
      return { ...state, loading: false, ...action.payload };
    case SET_CITY:
      return { ...state, loading: true, setCity: action.payload };
    case ENQUIRY:
      return { ...state, loading: true };
    case ENQUIRY_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case ENQUIRY_ERROR:
      return { ...state, loading: false, ...action.payload };
    default:
      return { ...state };
  }
};
