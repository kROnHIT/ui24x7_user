import {
  ADD_COMPLAIN,
  ADD_COMPLAIN_SUCCESS,
  ADD_COMPLAIN_ERROR,
  FETCH_COMPLAIN,
  FETCH_COMPLAIN_SUCCESS,
  FETCH_COMPLAIN_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: false,
  error: '',
  message: '',
  complainList: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_COMPLAIN:
      return { ...state, loading: true };
    case ADD_COMPLAIN_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case ADD_COMPLAIN_ERROR:
      return { ...state, loading: false, ...action.payload };
    case FETCH_COMPLAIN:
      return { ...state, loading: true };
    case FETCH_COMPLAIN_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case FETCH_COMPLAIN_ERROR:
      return { ...state, loading: false, ...action.payload };
    default: return { ...state, };
  }
}
