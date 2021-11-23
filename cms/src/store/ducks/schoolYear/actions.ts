import { SchoolYearsTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: SchoolYearsTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any[]) => ({
  type: SchoolYearsTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: SchoolYearsTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export const loadSchoolBondsRequest = (data?: any) => ({
  type: SchoolYearsTypes.LOAD_REQUEST_SCHOOLBONDS,
  payload: data,
});
export const loadSchoolBondsSuccess = (data: any[]) => ({
  type: SchoolYearsTypes.LOAD_SUCCESS_SCHOOLBONDS,
  payload: data,
});
export const loadSchoolBondsFailure = (err: any) => ({
  type: SchoolYearsTypes.LOAD_FAILURE_SCHOOLBONDS,
  payload: err,
});
