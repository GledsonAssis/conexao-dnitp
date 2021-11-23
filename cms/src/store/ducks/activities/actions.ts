import { ActivitiesTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: ActivitiesTypes.LOAD_REQUEST_SEARCH_ACTIVITES,
  payload: data,
});
export const loadListSuccess = (data: any) => ({
  type: ActivitiesTypes.LOAD_SUCCESS_SEARCH_ACTIVITES,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: ActivitiesTypes.LOAD_FAILURE_SEARCH_ACTIVITES,
  payload: err,
});

export const loadSearchRequest = (data?: any) => ({
  type: ActivitiesTypes.LOAD_REQUEST_SEARCH_ACTIVITY_ACTIVITES,
  payload: data,
});
export const loadSearchSuccess = (data: any) => ({
  type: ActivitiesTypes.LOAD_SUCCESS_SEARCH_ACTIVITY_ACTIVITES,
  payload: data,
});
export const loadSearchFailure = (err: any) => ({
  type: ActivitiesTypes.LOAD_FAILURE_SEARCH_ACTIVITY_ACTIVITES,
  payload: err,
});

export const loadFetchIdRequest = (data?: any) => ({
  type: ActivitiesTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchIdSuccess = (data: any) => ({
  type: ActivitiesTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchIdFailure = (err: any) => ({
  type: ActivitiesTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadGetAttachmentsRequest = (data?: any) => ({
  type: ActivitiesTypes.LOAD_REQUEST_GET_ATTACHMENT,
  payload: data,
});
export const loadGetAttachmentsSuccess = (data: any) => ({
  type: ActivitiesTypes.LOAD_SUCCESS_GET_ATTACHMENT,
  payload: data,
});
export const loadGetAttachmentsFailure = (err: any) => ({
  type: ActivitiesTypes.LOAD_FAILURE_GET_ATTACHMENT,
  payload: err,
});

export const loadPublishRequest = (data?: any) => ({
  type: ActivitiesTypes.LOAD_REQUEST_PUBLISH,
  payload: data,
});
export const loadPublishSuccess = (data: any) => ({
  type: ActivitiesTypes.LOAD_SUCCESS_PUBLISH,
  payload: data,
});
export const loadPublishFailure = (err: any) => ({
  type: ActivitiesTypes.LOAD_FAILURE_PUBLISH,
  payload: err,
});

export const loadGetListCSVsRequest = (data?: any) => ({
  type: ActivitiesTypes.LOAD_REQUEST_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsSuccess = (data: any) => ({
  type: ActivitiesTypes.LOAD_SUCCESS_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsFailure = (err: any) => ({
  type: ActivitiesTypes.LOAD_FAILURE_GET_LIST_CSV,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: ActivitiesTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: ActivitiesTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: ActivitiesTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});
