import {
  FETCH_EMERGENCY,
  FETCH_EMERGENCY_SUCCESS,
  FETCH_EMERGENCY_ERROR,
  SERVICE_ENQUIRY,
  SERVICE_ENQUIRY_SUCCESS,
  SERVICE_ENQUIRY_ERROR,
  SERVICE_INFORMATION,
  SERVICE_INFORMATION_SUCCESS,
  SERVICE_INFORMATION_ERROR,
  SEARCH_SERVICE,
  SEARCH_SERVICE_SUCCESS,
  SEARCH_SERVICE_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: false,
  error: '',
  message: '',
  emergencyData: [],
  serviceInformation: '',
  searchResult: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_EMERGENCY:
      return {...state, loading: true};
    case FETCH_EMERGENCY_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case FETCH_EMERGENCY_ERROR:
      return {...state, loading: false, ...action.payload};
    case SERVICE_ENQUIRY:
      return {...state, loading: true};
    case SERVICE_ENQUIRY_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case SERVICE_ENQUIRY_ERROR:
      return {...state, loading: false, ...action.payload};
    case SERVICE_INFORMATION:
      return {...state, loading: true};
    case SERVICE_INFORMATION_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case SERVICE_INFORMATION_ERROR:
      return {...state, loading: false, ...action.payload};
    case SEARCH_SERVICE:
      return {...state, loading: true};
    case SEARCH_SERVICE_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case SEARCH_SERVICE_ERROR:
      return {...state, loading: false, ...action.payload};
    default:
      return {...state};
  }
};
