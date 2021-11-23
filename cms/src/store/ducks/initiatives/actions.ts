import { InitiativesTypes } from './types';

export const loadListByStatusRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_LIST_BY_STATUS,
  payload: data,
});
export const loadListByStatusSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_LIST_BY_STATUS,
  payload: data,
});
export const loadListByStatusFailure = (err: any) => ({
  type: InitiativesTypes.LOAD_FAILURE_LIST_BY_STATUS,
  payload: err,
});

export const loadListStatusRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_LIST_STATUS,
  payload: data,
});
export const loadListStatusSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_LIST_STATUS,
  payload: data,
});
export const loadListStatusFailure = (err: any) => ({
  type: InitiativesTypes.LOAD_FAILURE_LIST_STATUS,
  payload: err,
});

export const loadListRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_FETCH,
  payload: data,
});
export const loadListSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_FETCH,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: InitiativesTypes.LOAD_FAILURE_FETCH,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: InitiativesTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});

export const loadSubmitAttachmentSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_SUBMITATTACHMENT,
  payload: data,
});
export const loadSubmitAttachmentFailure = (err: any) => ({
  type: InitiativesTypes.LOAD_FAILURE_SUBMITATTACHMENT,
  payload: err,
});

export const loadFetchRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: InitiativesTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadGetAttachmentsRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_GET_ATTACHMENT,
  payload: data,
});
export const loadGetAttachmentsSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_GET_ATTACHMENT,
  payload: data,
});
export const loadGetAttachmentsFailure = (err: any) => ({
  type: InitiativesTypes.LOAD_FAILURE_GET_ATTACHMENT,
  payload: err,
});

export const loadGetListCSVsRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsFailure = (err: any) => ({
  type: InitiativesTypes.LOAD_FAILURE_GET_LIST_CSV,
  payload: err,
});
