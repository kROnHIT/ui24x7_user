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
  
  export const fetchEmergency = (data) => ({
    type: FETCH_EMERGENCY,
    payload: data
  });
  export const fetchEmergencySuccess = (items) => ({
    type: FETCH_EMERGENCY_SUCCESS,
    payload: items
  });
  export const fetchEmergencyError = (message) => ({
    type: FETCH_EMERGENCY_ERROR,
    payload: message
  });
  export const serviceEnquiry = (data) => ({
    type: SERVICE_ENQUIRY,
    payload: data
  });
  export const serviceEnquirySuccess = (items) => ({
    type: SERVICE_ENQUIRY_SUCCESS,
    payload: items
  });
  export const serviceEnquiryError = (message) => ({
    type: SERVICE_ENQUIRY_ERROR,
    payload: message
  });
  export const serviceInformation = (data) => ({
    type: SERVICE_INFORMATION,
    payload: data
  });
  export const serviceInformationSuccess = (items) => ({
    type: SERVICE_INFORMATION_SUCCESS,
    payload: items
  });
  export const serviceInformationError = (message) => ({
    type: SERVICE_INFORMATION_ERROR,
    payload: message
  });
  export const searchService = (data) => ({
    type: SEARCH_SERVICE,
    payload: data
  });
  export const searchServiceSuccess = (items) => ({
    type: SEARCH_SERVICE_SUCCESS,
    payload: items
  });
  export const searchServiceError = (message) => ({
    type: SEARCH_SERVICE_ERROR,
    payload: message
  });