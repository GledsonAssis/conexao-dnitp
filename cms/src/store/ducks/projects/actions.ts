import { ProjectsTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: ProjectsTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any) => ({
  type: ProjectsTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: ProjectsTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export const loadPublishRequest = (data?: any) => ({
  type: ProjectsTypes.LOAD_REQUEST_PUBLISH,
  payload: data,
});
export const loadPublishSuccess = (data: any) => ({
  type: ProjectsTypes.LOAD_SUCCESS_PUBLISH,
  payload: data,
});
export const loadPublishFailure = (err: any) => ({
  type: ProjectsTypes.LOAD_FAILURE_PUBLISH,
  payload: err,
});

export const loadFetchRequest = (data?: any) => ({
  type: ProjectsTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: ProjectsTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: ProjectsTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadGetListCSVsRequest = (data?: any) => ({
  type: ProjectsTypes.LOAD_REQUEST_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsSuccess = (data: any) => ({
  type: ProjectsTypes.LOAD_SUCCESS_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsFailure = (err: any) => ({
  type: ProjectsTypes.LOAD_FAILURE_GET_LIST_CSV,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: ProjectsTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: ProjectsTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: ProjectsTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});

export const loadGetAttachmentsRequest = (data?: any) => ({
  type: ProjectsTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS,
  payload: data,
});
export const loadGetAttachmentsSuccess = (data: any) => ({
  type: ProjectsTypes.LOAD_SUCCESS_GET_ID_ATTACHMENTS,
  payload: data,
});
export const loadGetAttachmentsFailure = (err: any) => ({
  type: ProjectsTypes.LOAD_FAILURE_GET_ID_ATTACHMENTS,
  payload: err,
});
