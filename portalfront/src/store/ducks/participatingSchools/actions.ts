import { ParticipatingSchoolsTypes } from './types';

export const loadListRequest = (data?: any) => ({
  type: ParticipatingSchoolsTypes.LOAD_REQUEST_LIST,
  payload: data,
});
export const loadListSuccess = (data: any[]) => ({
  type: ParticipatingSchoolsTypes.LOAD_SUCCESS_LIST,
  payload: data,
});
export const loadListFailure = (err: any) => ({
  type: ParticipatingSchoolsTypes.LOAD_FAILURE_LIST,
  payload: err,
});
