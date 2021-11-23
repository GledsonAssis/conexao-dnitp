import { SchoolYearsTypes } from './types';

const loadListRequest = (data?: any) => ({
  type: SchoolYearsTypes.LOAD_REQUEST_LIST,
  payload: data,
});
const loadListSuccess = (data: any[]) => ({
  type: SchoolYearsTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
const loadListFailure = (err: any) => ({
  type: SchoolYearsTypes.LOAD_FAILURE_LIST,
  payload: err,
});

const loadSchoolBondsRequest = (data?: any) => ({
  type: SchoolYearsTypes.LOAD_REQUEST_SCHOOLBONDS,
  payload: data,
});
const loadSchoolBondsSuccess = (data: any[]) => ({
  type: SchoolYearsTypes.LOAD_SUCCESS_SCHOOLBONDS,
  payload: data,
});
const loadSchoolBondsFailure = (err: any) => ({
  type: SchoolYearsTypes.LOAD_FAILURE_SCHOOLBONDS,
  payload: err,
});

export {
  loadListRequest,
  loadListSuccess,
  loadListFailure,
  loadSchoolBondsRequest,
  loadSchoolBondsSuccess,
  loadSchoolBondsFailure
}
