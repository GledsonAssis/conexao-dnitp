import { ReportsTypes } from './types';

export const loadReportsInitiativesListRequest = (data?: any) => ({
  type: ReportsTypes.LOAD_REPORTS_INITIATIVES_REQUEST_LIST,
  payload: data,
});
export const loadReportsInitiativesListSuccess = (data: any) => ({
  type: ReportsTypes.LOAD_REPORTS_INITIATIVES_SUCCESS_LIST,
  payload: data,
});
export const loadReportsInitiativesListFailure = (err: any) => ({
  type: ReportsTypes.LOAD_REPORTS_INITIATIVES_FAILURE_LIST,
  payload: err,
});

export const loadReportsInteractivitiesListRequest = (data?: any) => ({
  type: ReportsTypes.LOAD_REPORTS_INTERACTIVITIES_REQUEST_LIST,
  payload: data,
});
export const loadReportsInteractivitiesListSuccess = (data: any) => ({
  type: ReportsTypes.LOAD_REPORTS_INTERACTIVITIES_SUCCESS_LIST,
  payload: data,
});
export const loadReportsInteractivitiesListFailure = (err: any) => ({
  type: ReportsTypes.LOAD_REPORTS_INTERACTIVITIES_FAILURE_LIST,
  payload: err,
});

export const loadReportsProjectsListRequest = (data?: any) => ({
  type: ReportsTypes.LOAD_REPORTS_PROJECTS_REQUEST_LIST,
  payload: data,
});
export const loadReportsProjectsListSuccess = (data: any) => ({
  type: ReportsTypes.LOAD_REPORTS_PROJECTS_SUCCESS_LIST,
  payload: data,
});
export const loadReportsProjectsListFailure = (err: any) => ({
  type: ReportsTypes.LOAD_REPORTS_PROJECTS_FAILURE_LIST,
  payload: err,
});

export const loadReportsMessagesListRequest = (data?: any) => ({
  type: ReportsTypes.LOAD_REPORTS_MESSAGES_REQUEST_LIST,
  payload: data,
});
export const loadReportsMessagesListSuccess = (data: any) => ({
  type: ReportsTypes.LOAD_REPORTS_MESSAGES_SUCCESS_LIST,
  payload: data,
});
export const loadReportsMessagesListFailure = (err: any) => ({
  type: ReportsTypes.LOAD_REPORTS_MESSAGES_FAILURE_LIST,
  payload: err,
});

export const loadReportsDownloadsListRequest = (data?: any) => ({
  type: ReportsTypes.LOAD_REPORTS_DOWNLOADS_REQUEST_LIST,
  payload: data,
});
export const loadReportsDownloadsListSuccess = (data: any) => ({
  type: ReportsTypes.LOAD_REPORTS_DOWNLOADS_SUCCESS_LIST,
  payload: data,
});
export const loadReportsDownloadsListFailure = (err: any) => ({
  type: ReportsTypes.LOAD_REPORTS_DOWNLOADS_FAILURE_LIST,
  payload: err,
});

export const loadReportsSurveiesListRequest = (data?: any) => ({
  type: ReportsTypes.LOAD_REPORTS_SURVEIES_REQUEST_LIST,
  payload: data,
});
export const loadReportsSurveiesListSuccess = (data: any) => ({
  type: ReportsTypes.LOAD_REPORTS_SURVEIES_SUCCESS_LIST,
  payload: data,
});
export const loadReportsSurveiesListFailure = (err: any) => ({
  type: ReportsTypes.LOAD_REPORTS_SURVEIES_FAILURE_LIST,
  payload: err,
});

export const loadReportsParticipantsListRequest = (data?: any) => ({
  type: ReportsTypes.LOAD_REPORTS_PARTICIPANTS_REQUEST_LIST,
  payload: data,
});
export const loadReportsParticipantsListSuccess = (data: any) => ({
  type: ReportsTypes.LOAD_REPORTS_PARTICIPANTS_SUCCESS_LIST,
  payload: data,
});
export const loadReportsParticipantsListFailure = (err: any) => ({
  type: ReportsTypes.LOAD_REPORTS_PARTICIPANTS_FAILURE_LIST,
  payload: err,
});

export const loadGetListCSVsRequest = (data?: any) => ({
  type: ReportsTypes.LOAD_REPORTS_REQUEST_GET_LIST_CSV,
  payload: data,
});
