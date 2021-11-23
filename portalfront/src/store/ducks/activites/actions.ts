import { ActivitesTypes } from './types';

export const loadSearchRequest = (data?: any) => ({
  type: ActivitesTypes.LOAD_REQUEST_SEARCH_ACTIVITES,
  payload: data,
});
export const loadSearchSuccess = (data: any) => ({
  type: ActivitesTypes.LOAD_SUCCESS_SEARCH_ACTIVITES,
  payload: data,
});
export const loadSearchFailure = (err: any) => ({
  type: ActivitesTypes.LOAD_FAILURE_SEARCH_ACTIVITES,
  payload: err,
});

export const loadFetchIdRequest = (data?: any) => ({
  type: ActivitesTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchIdSuccess = (data: any) => ({
  type: ActivitesTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchIdFailure = (err: any) => ({
  type: ActivitesTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadGetAttachmentsRequest = (data?: any) => ({
  type: ActivitesTypes.LOAD_REQUEST_GET_ATTACHMENT,
  payload: data,
});
export const loadGetAttachmentsSuccess = (data: any) => ({
  type: ActivitesTypes.LOAD_SUCCESS_GET_ATTACHMENT,
  payload: data,
});
export const loadGetAttachmentsFailure = (err: any) => ({
  type: ActivitesTypes.LOAD_FAILURE_GET_ATTACHMENT,
  payload: err,
});

export const searchRedirectProps = (data?: any) => ({
  type: ActivitesTypes.SEARCH_REDIRECT_PROPS,
  payload: data,
});
export const setDataProps = (data?: any) => ({
  type: ActivitesTypes.SET_DATA_PROPS,
  payload: data,
});
export const clearDataProps = (data?: any) => ({
  type: ActivitesTypes.CLEAR_DATA_PROPS,
  payload: data,
});

export const loadFetchSurveyRequest = (data?: any) => ({
  type: ActivitesTypes.LOAD_REQUEST_FETCH_SURVEY,
  payload: data,
});
export const loadFetchSurveySuccess = (data: any) => ({
  type: ActivitesTypes.LOAD_SUCCESS_FETCH_SURVEY,
  payload: data,
});
export const loadFetchSurveyFailure = (err: any) => ({
  type: ActivitesTypes.LOAD_FAILURE_FETCH_SURVEY,
  payload: err,
});

export const loadSubmitSurveyRequest = (data?: any) => ({
  type: ActivitesTypes.LOAD_REQUEST_SUBMIT_SURVEY,
  payload: data,
});
export const loadSubmitSurveySuccess = (data: any) => ({
  type: ActivitesTypes.LOAD_SUCCESS_SUBMIT_SURVEY,
  payload: data,
});
export const loadSubmitSurveyFailure = (err: any) => ({
  type: ActivitesTypes.LOAD_FAILURE_SUBMIT_SURVEY,
  payload: err,
});
