import { TrafficScopesTypes } from './types';

export const loadFetchRequest = (data?: any) => ({
  type: TrafficScopesTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: TrafficScopesTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: TrafficScopesTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadListRequest = (data?: any) => ({
  type: TrafficScopesTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any) => ({
  type: TrafficScopesTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: TrafficScopesTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export const loadDeleteRequest = (data?: any) => ({
  type: TrafficScopesTypes.LOAD_REQUEST_DELETE_ID,
  payload: data,
});
export const loadDeleteSuccess = (data: any) => ({
  type: TrafficScopesTypes.LOAD_SUCCESS_DELETE_ID,
  payload: data,
});
export const loadDeleteFailure = (err: any) => ({
  type: TrafficScopesTypes.LOAD_FAILURE_DELETE_ID,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: TrafficScopesTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: TrafficScopesTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: TrafficScopesTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});
