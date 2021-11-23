import { downloadData } from '@/utils/http';
import { ActionsTypes } from './types';

export const loadHighlightsRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_HIGHLIGHTS,
  payload: data,
});
export const loadHighlightsSuccess = (data: any[]) => ({
  type: ActionsTypes.LOAD_SUCCESS_HIGHLIGHTS,
  payload: data,
});
export const loadHighlightsFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_HIGHLIGHTS,
  payload: err,
});

export const loadFetchRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: ActionsTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadFetchRatingRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_FETCH_ID_RATING,
  payload: data,
});
export const loadFetchRatingSuccess = (data: any) => ({
  type: ActionsTypes.LOAD_SUCCESS_FETCH_ID_RATING,
  payload: data,
});
export const loadFetchRatingFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_FETCH_ID_RATING,
  payload: err,
});
export const loadFetchCommentsRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_FETCH_ID_COMMENTS,
  payload: data,
});
export const loadFetchCommentsSuccess = (data: any) => ({
  type: ActionsTypes.LOAD_SUCCESS_FETCH_ID_COMMENTS,
  payload: data,
});
export const loadFetchCommentsFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_FETCH_ID_COMMENTS,
  payload: err,
});
export const loadFetchAttachmentsRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_FETCH_ID_ATTACHMENTS,
  payload: data,
});
export const loadFetchAttachmentsSuccess = (data: any) => ({
  type: ActionsTypes.LOAD_SUCCESS_FETCH_ID_ATTACHMENTS,
  payload: data,
});
export const loadFetchAttachmentsFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_FETCH_ID_ATTACHMENTS,
  payload: err,
});
export const loadFetchImagesRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_FETCH_ID_IMAGES,
  payload: data,
});
export const loadFetchImagesSuccess = (data: any) => ({
  type: ActionsTypes.LOAD_SUCCESS_FETCH_ID_IMAGES,
  payload: data,
});
export const loadFetchImagesFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_FETCH_ID_IMAGES,
  payload: err,
});
export const loadGetAttachmentsRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_GET_ID_ATTACHMENTS,
  payload: data,
});
export const loadGetAttachmentsSuccess = (data: any) => ({
  type: ActionsTypes.LOAD_SUCCESS_GET_ID_ATTACHMENTS,
  payload: data,
});
export const loadGetAttachmentsFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_GET_ID_ATTACHMENTS,
  payload: err,
});

export const setRateRequest = (data?: any) => ({
  type: ActionsTypes.SET_RATE_REQUEST,
  payload: data,
});
export const setRateSuccess = (data: any) => ({
  type: ActionsTypes.SET_RATE_SUCCESS,
  payload: data,
});
export const setRateFailure = (err: any) => ({
  type: ActionsTypes.SET_RATE_FAILURE,
  payload: err,
});

export const loadSubmitNewRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_SUBMIT_NEW_COMMENT,
  payload: data,
});
export const loadSubmitNewSuccess = (data: any) => ({
  type: ActionsTypes.LOAD_SUCCESS_SUBMIT_NEW_COMMENT,
  payload: data,
});
export const loadSubmitNewFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_SUBMIT_NEW_COMMENT,
  payload: err,
});

export const loadDeleteCommentRequest = (data?: any) => ({
  type: ActionsTypes.LOAD_REQUEST_DELETE_COMMENT,
  payload: data,
});
export const loadDeleteCommentSuccess = (data: any) => ({
  type: ActionsTypes.LOAD_SUCCESS_DELETE_COMMENT,
  payload: data,
});
export const loadDeleteCommentFailure = (err: any) => ({
  type: ActionsTypes.LOAD_FAILURE_DELETE_COMMENT,
  payload: err,
});
