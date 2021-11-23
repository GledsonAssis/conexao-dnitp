import { DisciplinesTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: DisciplinesTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any[]) => ({
  type: DisciplinesTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: DisciplinesTypes.LOAD_FAILURE_LIST,
  payload: err,
});
