import { SubjectsTypes } from './types';

export const loadFetchRequest = (data?: any) => ({
  type: SubjectsTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: SubjectsTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: SubjectsTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});
