import { UsersTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: UsersTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any) => ({
  type: UsersTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: UsersTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export const loadFetchRequest = (data?: any) => ({
  type: UsersTypes.LOAD_REQUEST_FETCH,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: UsersTypes.LOAD_SUCCESS_FETCH,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: UsersTypes.LOAD_FAILURE_FETCH,
  payload: err,
});

export const loadGetListCSVsRequest = (data?: any) => ({
  type: UsersTypes.LOAD_REQUEST_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsSuccess = (data: any) => ({
  type: UsersTypes.LOAD_SUCCESS_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsFailure = (err: any) => ({
  type: UsersTypes.LOAD_FAILURE_GET_LIST_CSV,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: UsersTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: UsersTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: UsersTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});

export const loadActiveRequest = (data?: any) => ({
  type: UsersTypes.LOAD_REQUEST_ACTIVE,
  payload: data,
});
export const loadActiveSuccess = (data: any) => ({
  type: UsersTypes.LOAD_SUCCESS_ACTIVE,
  payload: data,
});
export const loadActiveFailure = (err: any) => ({
  type: UsersTypes.LOAD_FAILURE_ACTIVE,
  payload: err,
});

export const loadRolesRequest = (data?: any) => ({
  type: UsersTypes.LOAD_REQUEST_ROLES,
  payload: data,
});
export const loadRolesSuccess = (data: any) => ({
  type: UsersTypes.LOAD_SUCCESS_ROLES,
  payload: data,
});
export const loadRolesFailure = (err: any) => ({
  type: UsersTypes.LOAD_FAILURE_ROLES,
  payload: err,
});

export const loadReleaseAccessRequest = (data?: any) => ({
  type: UsersTypes.LOAD_REQUEST_RELEASEACCESS,
  payload: data,
});
export const loadReleaseAccessResponse = (data: any) => ({
  type: UsersTypes.LOAD_RESPONSE_RELEASEACCESS,
  payload: data,
});
