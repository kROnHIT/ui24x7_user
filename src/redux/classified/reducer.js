import {
  FETCH_EMERGENCY,
  FETCH_EMERGENCY_SUCCESS,
  FETCH_EMERGENCY_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: false,
  error: '',
  message: '',
  emergeencyData: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_EMERGENCY:
      return { ...state, loading: true };
    case FETCH_EMERGENCY_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case FETCH_EMERGENCY_ERROR:
      return { ...state, loading: false, ...action.payload };
    default: return { ...state, };
  }
}
