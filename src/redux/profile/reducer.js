import {
  ADD_FAMILY_MEMBER,
  ADD_FAMILY_MEMBER_SUCCESS,
  ADD_FAMILY_MEMBER_ERROR,
  FETCH_FAMILY_MEMBER,
  FETCH_FAMILY_MEMBER_SUCCESS,
  FETCH_FAMILY_MEMBER_ERROR,

  ADD_VEHICLE,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_ERROR,
  FETCH_VEHICLE,
  FETCH_VEHICLE_SUCCESS,
  FETCH_VEHICLE_ERROR,

  ADD_DAILY_HELP,
  ADD_DAILY_HELP_SUCCESS,
  ADD_DAILY_HELP_ERROR,
  FETCH_DAILY_HELP,
  FETCH_DAILY_HELP_SUCCESS,
  FETCH_DAILY_HELP_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: false,
  fLoading: false,
  vLoading: false,
  dLoading: false,
  error: '',
  message: '',
  familyMemberList: [],
  familyVehicleList: [],
  familyDailyHelpList: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_FAMILY_MEMBER:
      return { ...state, loading: true };
    case ADD_FAMILY_MEMBER_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case ADD_FAMILY_MEMBER_ERROR:
      return { ...state, loading: false, ...action.payload };
    case FETCH_FAMILY_MEMBER:
      return { ...state, fLoading: true };
    case FETCH_FAMILY_MEMBER_SUCCESS:
      return { ...state, fLoading: false, ...action.payload };
    case FETCH_FAMILY_MEMBER_ERROR:
      return { ...state, fLoading: false, ...action.payload };
    case ADD_VEHICLE:
      return { ...state, loading: true };
    case ADD_VEHICLE_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case ADD_VEHICLE_ERROR:
      return { ...state, loading: false, ...action.payload };
    case FETCH_VEHICLE:
      return { ...state, vLoading: true };
    case FETCH_VEHICLE_SUCCESS:
      return { ...state, vLoading: false, ...action.payload };
    case FETCH_VEHICLE_ERROR:
      return { ...state, vLoading: false, ...action.payload };
    case ADD_DAILY_HELP:
      return { ...state, loading: true };
    case ADD_DAILY_HELP_SUCCESS:
      return { ...state, loading: false, ...action.payload };
    case ADD_DAILY_HELP_ERROR:
      return { ...state, loading: false, ...action.payload };
    case FETCH_DAILY_HELP:
      return { ...state, dLoading: true };
    case FETCH_DAILY_HELP_SUCCESS:
      return { ...state, dLoading: false, ...action.payload };
    case FETCH_DAILY_HELP_ERROR:
      return { ...state, dLoading: false, ...action.payload };
    default: return { ...state };
  }
}
