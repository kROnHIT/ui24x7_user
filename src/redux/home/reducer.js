import {
  FETCH_NOTICE_ALL,
  FETCH_NOTICE_ALL_SUCCESS,
  FETCH_NOTICE_ALL_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: false,
  error: '',
  message: '',
  noticeListAll: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_NOTICE_ALL:
      return { ...state, loading: true };
    case FETCH_NOTICE_ALL_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case FETCH_NOTICE_ALL_ERROR:
      return { ...state, loading: false, ...action.payload };
    default: return { ...state, };
  }
}
