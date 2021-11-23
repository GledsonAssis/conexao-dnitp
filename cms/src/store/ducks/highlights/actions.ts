import { HighlightsTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: HighlightsTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any[]) => ({
  type: HighlightsTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: HighlightsTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: HighlightsTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any[]) => ({
  type: HighlightsTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: HighlightsTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});
