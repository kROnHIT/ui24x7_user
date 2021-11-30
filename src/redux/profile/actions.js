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

export const addFamilyMember = (data) => ({
  type: ADD_FAMILY_MEMBER,
  payload: data
});
export const addFamilyMemberSuccess = (items) => ({
  type: ADD_FAMILY_MEMBER_SUCCESS,
  payload: items
});
export const addFamilyMemberError = (message) => ({
  type: ADD_FAMILY_MEMBER_ERROR,
  payload: message
});
export const fetchFamilyMember = (data) => ({
  type: FETCH_FAMILY_MEMBER,
  payload: data
});
export const fetchFamilyMemberSuccess = (items) => ({
  type: FETCH_FAMILY_MEMBER_SUCCESS,
  payload: items
});
export const fetchFamilyMemberError = (message) => ({
  type: FETCH_FAMILY_MEMBER_ERROR,
  payload: message
});

export const addVehicle = (data) => ({
  type: ADD_VEHICLE,
  payload: data
});
export const addVehicleSuccess = (items) => ({
  type: ADD_VEHICLE_SUCCESS,
  payload: items
});
export const addVehicleError = (message) => ({
  type: ADD_VEHICLE_ERROR,
  payload: message
});
export const fetchVehicle = (data) => ({
  type: FETCH_VEHICLE,
  payload: data
});
export const fetchVehicleSuccess = (items) => ({
  type: FETCH_VEHICLE_SUCCESS,
  payload: items
});
export const fetchVehicleError = (message) => ({
  type: FETCH_VEHICLE_ERROR,
  payload: message
});

export const addDailyHelp = (data) => ({
  type: ADD_DAILY_HELP,
  payload: data
});
export const addDailyHelpSuccess = (items) => ({
  type: ADD_DAILY_HELP_SUCCESS,
  payload: items
});
export const addDailyHelpError = (message) => ({
  type: ADD_DAILY_HELP_ERROR,
  payload: message
});
export const fetchDailyHelp = (data) => ({
  type: FETCH_DAILY_HELP,
  payload: data
});
export const fetchDailyHelpSuccess = (items) => ({
  type: FETCH_DAILY_HELP_SUCCESS,
  payload: items
});
export const fetchDailyHelpError = (message) => ({
  type: FETCH_DAILY_HELP_ERROR,
  payload: message
});