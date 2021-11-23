import { DnitLocalUnitsTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: DnitLocalUnitsTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any) => ({
  type: DnitLocalUnitsTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: DnitLocalUnitsTypes.LOAD_FAILURE_LIST,
  payload: err,
});

export const loadListSuperintendencesRequest = (data?: any) => ({
  type: DnitLocalUnitsTypes.LOAD_REQUEST_LIST_SUPERINTENDENCES,
  payload: data,
});
export const loadListSuperintendencesSuccess = (data: any) => ({
  type: DnitLocalUnitsTypes.LOAD_SUCCESS_LIST_SUPERINTENDENCES,
  payload: data,
});
export const loadListSuperintendencesFailure = (err: any) => ({
  type: DnitLocalUnitsTypes.LOAD_FAILURE_LIST_SUPERINTENDENCES,
  payload: err,
});

export const loadListRoadsRequest = (data?: any) => ({
  type: DnitLocalUnitsTypes.LOAD_REQUEST_LIST_ROADS,
  payload: data,
});
export const loadListRoadsSuccess = (data: any) => ({
  type: DnitLocalUnitsTypes.LOAD_SUCCESS_LIST_ROADS,
  payload: data,
});
export const loadListRoadsFailure = (err: any) => ({
  type: DnitLocalUnitsTypes.LOAD_FAILURE_LIST_ROADS,
  payload: err,
});

export const loadListCitiesByIdLocalUnitRequest = (data?: any) => ({
  type: DnitLocalUnitsTypes.LOAD_REQUEST_LIST_CITIES_BY_LOCAL_UNIT,
  payload: data,
});
export const loadListCitiesByIdLocalUnitSuccess = (data: any) => ({
  type: DnitLocalUnitsTypes.LOAD_SUCCESS_LIST_CITIES_BY_LOCAL_UNIT,
  payload: data,
});
export const loadListCitiesByIdLocalUnitFailure = (err: any) => ({
  type: DnitLocalUnitsTypes.LOAD_FAILURE_LIST_CITIES_BY_LOCAL_UNIT,
  payload: err,
});

export const loadFetchRequest = (data?: any) => ({
  type: DnitLocalUnitsTypes.LOAD_REQUEST_FETCH_ID,
  payload: data,
});
export const loadFetchSuccess = (data: any) => ({
  type: DnitLocalUnitsTypes.LOAD_SUCCESS_FETCH_ID,
  payload: data,
});
export const loadFetchFailure = (err: any) => ({
  type: DnitLocalUnitsTypes.LOAD_FAILURE_FETCH_ID,
  payload: err,
});

export const loadDeleteRequest = (data?: any) => ({
  type: DnitLocalUnitsTypes.LOAD_REQUEST_DELETE_ID,
  payload: data,
});
export const loadDeleteSuccess = (data: any) => ({
  type: DnitLocalUnitsTypes.LOAD_SUCCESS_DELETE_ID,
  payload: data,
});
export const loadDeleteFailure = (err: any) => ({
  type: DnitLocalUnitsTypes.LOAD_FAILURE_DELETE_ID,
  payload: err,
});

export const loadGetListCSVsRequest = (data?: any) => ({
  type: DnitLocalUnitsTypes.LOAD_REQUEST_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsSuccess = (data: any) => ({
  type: DnitLocalUnitsTypes.LOAD_SUCCESS_GET_LIST_CSV,
  payload: data,
});
export const loadGetListCSVsFailure = (err: any) => ({
  type: DnitLocalUnitsTypes.LOAD_FAILURE_GET_LIST_CSV,
  payload: err,
});

export const loadSubmitRequest = (data?: any) => ({
  type: DnitLocalUnitsTypes.LOAD_REQUEST_SUBMIT,
  payload: data,
});
export const loadSubmitSuccess = (data: any) => ({
  type: DnitLocalUnitsTypes.LOAD_SUCCESS_SUBMIT,
  payload: data,
});
export const loadSubmitFailure = (err: any) => ({
  type: DnitLocalUnitsTypes.LOAD_FAILURE_SUBMIT,
  payload: err,
});
