import { TrafficContentsTypes } from './types';

export const loadFetchRequest = (data?: any) => ({
  type: TrafficContentsTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: TrafficContentsTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: TrafficContentsTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});
