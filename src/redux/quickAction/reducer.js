import {
  ADD_MESSAGE_TO_GUARD,
  ADD_MESSAGE_TO_GUARD_SUCCESS,
  ADD_MESSAGE_TO_GUARD_ERROR,
  ADD_FUTURE_ENTRY,
  ADD_FUTURE_ENTRY_SUCCESS,
  ADD_FUTURE_ENTRY_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: false,
  error: '',
  message: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_MESSAGE_TO_GUARD:
      return { ...state, loading: true };
    case ADD_MESSAGE_TO_GUARD_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case ADD_MESSAGE_TO_GUARD_ERROR:
      return { ...state, loading: false, ...action.payload };
    case ADD_FUTURE_ENTRY:
      return { ...state, loading: true };
    case ADD_FUTURE_ENTRY_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case ADD_FUTURE_ENTRY_ERROR:
      return { ...state, loading: false, ...action.payload };
    default: return { ...state };
  }
}
