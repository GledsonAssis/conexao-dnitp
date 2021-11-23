import { StatesTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: StatesTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any[]) => ({
  type: StatesTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: StatesTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export const loadCitiesListRequest = (data?: any) => ({
  type: StatesTypes.LOAD_REQUEST_CITIES,
  payload: data,
});
export const loadCitiesListSuccess = (data: any[]) => ({
  type: StatesTypes.LOAD_SUCCESS_CITIES,
  payload: data,
});
export const loadCitiesListFailure = (err: any) => ({
  type: StatesTypes.LOAD_FAILURE_CITIES,
  payload: err,
});

export const loadInstitutionsRequest = (data?: any) => ({
  type: StatesTypes.LOAD_REQUEST_INSTITUITIONS,
  payload: data,
});
export const loadInstitutionsSuccess = (data: any[]) => ({
  type: StatesTypes.LOAD_SUCCESS_INSTITUITIONS,
  payload: data,
});
export const loadInstitutionsFailure = (err: any) => ({
  type: StatesTypes.LOAD_FAILURE_INSTITUITIONS,
  payload: err,
});
