import { GeneralSearchTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: GeneralSearchTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any[]) => ({
  type: GeneralSearchTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: GeneralSearchTypes.LOAD_FAILURE_LIST,
  payload: err,
});
