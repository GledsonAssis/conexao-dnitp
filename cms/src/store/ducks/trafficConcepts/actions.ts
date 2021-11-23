import { TrafficConceptsTypes } from './types';

export const loadFetchRequest = (data?: any) => ({
  type: TrafficConceptsTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: TrafficConceptsTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: TrafficConceptsTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadListRequest = (data?: any) => ({
  type: TrafficConceptsTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any) => ({
  type: TrafficConceptsTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: TrafficConceptsTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export const loadDeleteRequest = (data?: any) => ({
  type: TrafficConceptsTypes.LOAD_REQUEST_DELETE_ID,
  payload: data,
});
export const loadDeleteSuccess = (data: any) => ({
  type: TrafficConceptsTypes.LOAD_SUCCESS_DELETE_ID,
  payload: data,
});
export const loadDeleteFailure = (err: any) => ({
  type: TrafficConceptsTypes.LOAD_FAILURE_DELETE_ID,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: TrafficConceptsTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: TrafficConceptsTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: TrafficConceptsTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});

export const loadGetListCSVsRequest = (data?: any) => ({
  type: TrafficConceptsTypes.LOAD_REQUEST_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsSuccess = (data: any) => ({
  type: TrafficConceptsTypes.LOAD_SUCCESS_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsFailure = (err: any) => ({
  type: TrafficConceptsTypes.LOAD_FAILURE_GET_LIST_CSV,
  payload: err,
});
