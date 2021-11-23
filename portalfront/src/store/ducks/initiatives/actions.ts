import { InitiativesTypes } from './types';

export const loadFetchRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_FETCH,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_FETCH,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
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

export const loadFetchIdRequest = (data?: any) => ({
  type: InitiativesTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchIdSuccess = (data: any) => ({
  type: InitiativesTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchIdFailure = (err: any) => ({
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
